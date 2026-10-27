import React, { useEffect, useRef, useState } from 'react';
import { 
  Skull, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  AlertTriangle, 
  QrCode, 
  Lock, 
  CheckCircle,
  Eye,
  Info
} from 'lucide-react';

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  useEffect(() => {
    // Inicializar audio
    const audio = new Audio('/alarm.mp3');
    audio.loop = true;
    audioRef.current = audio;

    // Intentar reproducir automáticamente al cargar la página
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsInteraction(false);
        })
        .catch((error) => {
          // La política de autoplay del navegador bloqueó el audio sin interacción previa
          console.warn('Autoplay bloqueado por el navegador. Esperando interacción del usuario:', error);
          setNeedsInteraction(true);
        });
    }

    // Listener global para activar audio con el primer clic o toque en cualquier parte
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setNeedsInteraction(false);
          })
          .catch((err) => console.error('Error al iniciar audio tras interacción:', err));
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsInteraction(false);
        })
        .catch((err) => console.error('Error reproduciendo audio:', err));
    }
  };

  const handleManualPlay = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsInteraction(false);
        })
        .catch((err) => console.error('Error:', err));
    }
  };

  return (
    <>
      {/* Líneas de escaneo y efectos visuales de alerta */}
      <div className="scanlines" aria-hidden="true" />

      {/* Botón flotante si el navegador requirió interacción previa para el sonido */}
      {needsInteraction && (
        <div className="tap-to-play-overlay">
          <button onClick={handleManualPlay} className="tap-button">
            <Volume2 size={20} className="animate-bounce" />
            <span>🚨 Haz clic para activar la alarma sonora</span>
          </button>
        </div>
      )}

      <main className="container">
        {/* Banner de control de audio / estado */}
        <div 
          className="audio-banner" 
          onClick={toggleSound}
          role="button"
          tabIndex={0}
          title={isPlaying ? "Silenciar alarma" : "Activar alarma"}
        >
          {isPlaying ? (
            <>
              <div className="audio-wave">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Volume2 size={18} />
              <span>Alarma sonando (clic para silenciar)</span>
            </>
          ) : (
            <>
              <div className="audio-wave paused">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <VolumeX size={18} />
              <span>Alarma pausada (clic para activar)</span>
            </>
          )}
        </div>

        {/* Badge de advertencia */}
        <div className="alert-badge">
          <ShieldAlert size={16} />
          <span>Simulación de Seguridad Informática</span>
        </div>

        {/* Icono animado de calavera con halo de pulso */}
        <div className="icon-stage">
          <div className="skull-glow-ring" />
          <Skull size={96} className="skull-icon" strokeWidth={1.75} />
        </div>

        {/* Título principal con el mensaje original */}
        <h1 className="main-title">
          ¡Caíste en un sitio malicioso!
        </h1>

        {/* Mensaje explicativo original */}
        <p className="warning-desc">
          Este es un <strong>ejemplo práctico</strong> de cómo se vería un sitio web peligroso o un ataque de <strong>Quishing</strong> (phishing vía código QR).
          <br />
          <strong>¡Mantente siempre alerta y protege tu información!</strong>
        </p>

        {/* Recuadro informativo sobre Quishing */}
        <div className="quishing-box">
          <div className="quishing-icon">
            <QrCode size={36} />
          </div>
          <div className="quishing-text">
            <h4>¿Qué es el Quishing?</h4>
            <p>
              Es una técnica de ciberataque donde atacantes sustituyen códigos QR legítimos por otros maliciosos para redirigirte a páginas fraudulentas o descargar malware en tu dispositivo.
            </p>
          </div>
        </div>

        {/* Tarjetas educativas y de buenas prácticas */}
        <div className="cards-grid">
          <div className="glass-card">
            <div className="card-header">
              <Eye size={22} className="card-icon" />
              <span>1. Inspecciona la URL</span>
            </div>
            <p className="card-body">
              Antes de abrir el enlace sugerido por la cámara o tu lector de QR, verifica el dominio completo y que cuente con certificado seguro HTTPS.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-header">
              <Lock size={22} className="card-icon" />
              <span>2. No des credenciales</span>
            </div>
            <p className="card-body">
              Nunca ingreses contraseñas, números de tarjeta ni códigos bancarios en páginas a las que hayas llegado escaneando códigos en la vía pública o correos no verificados.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-header">
              <AlertTriangle size={22} className="card-icon" />
              <span>3. Activa 2FA (MFA)</span>
            </div>
            <p className="card-body">
              La autenticación de doble factor previene accesos no autorizados incluso si un ciberdelincuente llega a capturar tu contraseña en un formulario trampa.
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => setHasAcknowledged(true)}
          >
            {hasAcknowledged ? (
              <>
                <CheckCircle size={18} />
                <span>¡Lección completada! Mantente seguro</span>
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                <span>He aprendido la lección</span>
              </>
            )}
          </button>

          <button 
            className="btn-secondary"
            onClick={toggleSound}
          >
            {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isPlaying ? 'Silenciar alarma' : 'Probar sonido de alarma'}</span>
          </button>
        </div>

        <footer className="footer-note">
          <Info size={14} />
          <span>Página de entrenamiento y concientización contra Phishing / Quishing. Ningún dato fue comprometido.</span>
        </footer>
      </main>
    </>
  );
}
