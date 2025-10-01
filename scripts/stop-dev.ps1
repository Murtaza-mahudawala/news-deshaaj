# Stop Development Processes Script
# This script stops all running development servers and frees up ports

Write-Host "🛑 Stopping all development processes..." -ForegroundColor Yellow

# Stop Node.js processes
Write-Host "Stopping Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Stop npm processes
Write-Host "Stopping npm processes..." -ForegroundColor Yellow
Get-Process -Name "npm" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Stop any processes using common development ports
Write-Host "Checking for processes on development ports..." -ForegroundColor Yellow

$ports = @(3000, 3001, 3002, 3003, 8080, 8081, 5000, 5001)

foreach ($port in $ports) {
    $connections = netstat -ano | findstr ":$port "
    if ($connections) {
        Write-Host "Found connections on port $port" -ForegroundColor Yellow
        $connections | ForEach-Object {
            $parts = $_ -split '\s+'
            if ($parts.Length -gt 4) {
                $pid = $parts[-1]
                if ($pid -match '^\d+$') {
                    try {
                        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                        if ($process) {
                            Write-Host "Stopping process $($process.ProcessName) (PID: $pid) on port $port" -ForegroundColor Red
                            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                        }
                    } catch {
                        # Process might already be stopped
                    }
                }
            }
        }
    }
}

# Wait a moment for processes to stop
Start-Sleep -Seconds 2

# Check if ports are now free
Write-Host "`nChecking port status..." -ForegroundColor Green
foreach ($port in $ports) {
    $connections = netstat -ano | findstr ":$port "
    if ($connections) {
        $activeConnections = $connections | Where-Object { $_ -notmatch "TIME_WAIT" }
        if ($activeConnections) {
            Write-Host "⚠️  Port $port still has active connections" -ForegroundColor Yellow
        } else {
            Write-Host "✅ Port $port is free (only TIME_WAIT connections)" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ Port $port is completely free" -ForegroundColor Green
    }
}

Write-Host "`n✅ All development processes stopped!" -ForegroundColor Green
Write-Host "You can now start fresh development servers." -ForegroundColor Cyan


