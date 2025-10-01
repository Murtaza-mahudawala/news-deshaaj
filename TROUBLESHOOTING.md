# Troubleshooting Guide - Desh Aaj News

## Common Issues and Solutions

### 1. `npm run dev` Not Working

#### Quick Fix:
```powershell
# Run the quick fix script
.\scripts\dev-fix.ps1
```

#### For Dependency Issues (like "Cannot find module 'is-number'"):
```powershell
# Run the dependency fix script
npm run fix:deps
```

#### Manual Steps:
1. **Stop all Node.js processes:**
   ```powershell
   Get-Process -Name "node" | Stop-Process -Force
   ```

2. **Clear caches:**
   ```powershell
   npm cache clean --force
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```

3. **Reinstall dependencies:**
   ```powershell
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
   npm install
   ```

4. **Start development server:**
   ```powershell
   npm run dev
   ```

### 2. File Permission Errors (OneDrive Issues)

#### Problem:
```
EPERM: operation not permitted, rmdir
Cannot find module 'is-number'
```

#### Solutions:
1. **Move project outside OneDrive:**
   - Move the project to `C:\dev\news-deshaaj` instead of OneDrive
   - OneDrive sync can cause file permission issues

2. **Run as Administrator:**
   ```powershell
   # Right-click PowerShell and "Run as Administrator"
   cd C:\path\to\news-deshaaj
   npm install
   ```

3. **Disable OneDrive sync temporarily:**
   - Right-click OneDrive folder → Settings → Pause syncing
   - Run npm commands
   - Re-enable syncing

### 3. Tailwind CSS Build Errors

#### Problem:
```
Error: Cannot find module 'is-number'
Failed to load external module tailwindcss
```

#### Quick Fix:
```powershell
npm run fix:deps
```

#### Manual Fix:
```powershell
# Install missing dependencies
npm install is-number
npm install to-regex-range
npm install fill-range
npm install braces

# Or reinstall everything
npm run clean
```

### 4. Security Vulnerabilities

#### Check vulnerabilities:
```powershell
npm audit
```

#### Fix vulnerabilities:
```powershell
npm audit fix
```

#### Force fix (if needed):
```powershell
npm audit fix --force
```

### 4. TypeScript Errors

#### Check for TypeScript errors:
```powershell
npm run typecheck
```

#### Common fixes:
- Update TypeScript: `npm install typescript@latest`
- Clear TypeScript cache: `npx tsc --build --clean`

### 5. ESLint Errors

#### Check for linting errors:
```powershell
npm run lint
```

#### Fix auto-fixable errors:
```powershell
npm run lint -- --fix
```

### 6. Port Already in Use

#### Find process using port 3000:
```powershell
netstat -ano | findstr :3000
```

#### Kill the process:
```powershell
taskkill /PID <PID_NUMBER> /F
```

#### Use different port:
```powershell
npm run dev -- -p 3001
```

### 7. Memory Issues

#### Increase Node.js memory:
```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

### 8. Network Issues

#### Use different registry:
```powershell
npm config set registry https://registry.npmjs.org/
npm install
```

## Prevention Tips

### 1. Use Proper Directory Structure
- Avoid OneDrive for development projects
- Use `C:\dev\` or `C:\projects\` instead

### 2. Regular Maintenance
```powershell
# Weekly cleanup
npm cache clean --force
npm audit
npm update
```

### 3. Use Version Managers
- Install Node.js via `nvm-windows` for better version management
- Use `yarn` as alternative to `npm` if issues persist

### 4. Environment Setup
```powershell
# Set environment variables
$env:NODE_ENV="development"
$env:NEXT_TELEMETRY_DISABLED="1"
```

## Emergency Reset

If nothing works, perform a complete reset:

```powershell
# 1. Stop all processes
Get-Process -Name "node" | Stop-Process -Force

# 2. Remove all generated files
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# 3. Clear all caches
npm cache clean --force

# 4. Fresh install
npm install

# 5. Start development
npm run dev
```

## Getting Help

If issues persist:
1. Check the console output for specific error messages
2. Look at the browser developer tools for client-side errors
3. Check the Next.js documentation: https://nextjs.org/docs
4. Create an issue with the full error message and steps to reproduce
