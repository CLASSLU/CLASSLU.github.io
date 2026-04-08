param(
  [string]$OutputPath = "D:\project\jiuwan\data\openclaw-status.json"
)

$now = (Get-Date).ToString("o")

$status = [ordered]@{
  updatedAt = $now
  gatewayOnline = $false
  healthSummary = "openclaw not installed or gateway unreachable"
  activeModel = "not provided"
  channelsOnline = 0
  totalChannels = 0
  sessionsActive = 0
}

$openclaw = Get-Command openclaw -ErrorAction SilentlyContinue
if ($null -eq $openclaw) {
  $status.healthSummary = "openclaw command not available"
} else {
  try {
    $raw = openclaw health --json --timeout 5000 2>$null
    if ($LASTEXITCODE -eq 0 -and $raw) {
      $obj = $raw | ConvertFrom-Json -ErrorAction Stop

      $gatewayOnline = [bool]($obj.ok)
      $channelsTotal = 0
      $channelsOnline = 0

      if ($null -ne $obj.channels) {
        $channelProps = $obj.channels.PSObject.Properties
        $channelsTotal = ($channelProps | Measure-Object).Count
        $channelsOnline = (
          $channelProps |
          Where-Object {
            $value = $_.Value
            ($value.PSObject.Properties.Name -contains "ok" -and [bool]$value.ok) -or
            ($value.PSObject.Properties.Name -contains "connected" -and [bool]$value.connected)
          }
        ).Count
      }

      $sessionsActive = 0
      if ($null -ne $obj.sessions) {
        if ($obj.sessions.PSObject.Properties.Name -contains "active") {
          $sessionsActive = [int]$obj.sessions.active
        } elseif ($obj.sessions.PSObject.Properties.Name -contains "summary" -and $obj.sessions.summary.PSObject.Properties.Name -contains "total") {
          $sessionsActive = [int]$obj.sessions.summary.total
        }
      }

      $status = [ordered]@{
        updatedAt = $now
        gatewayOnline = $gatewayOnline
        healthSummary = $(if ($gatewayOnline) { "gateway reachable" } else { "gateway unreachable" })
        activeModel = $(if ($obj.PSObject.Properties.Name -contains "model") { [string]$obj.model } else { "not provided" })
        channelsOnline = $channelsOnline
        totalChannels = $channelsTotal
        sessionsActive = $sessionsActive
      }
    } else {
      $status.healthSummary = "openclaw health command failed"
    }
  } catch {
    $status.healthSummary = "openclaw health output parse failed"
  }
}

$dir = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $dir)) {
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

$status | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $OutputPath -Encoding UTF8
Write-Output "OpenClaw status written: $OutputPath"

