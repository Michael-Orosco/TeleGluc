@echo off
cd /d C:\Users\User\Desktop\TeleGluc
echo === Subiendo cambios a Git ===
git add src/routes/index.tsx
git commit -m "fix: registro completo paciente/medico, botones interactivos, UI mejorada"
git push
echo.
echo === Listo! Vercel redespliegara automaticamente en ~2 minutos ===
pause
