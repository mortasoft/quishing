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
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  useEffect(() => {
    // Intentar reproducir automáticamente tan pronto se monte el componente
    const startAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // El navegador puede requerir interacción previa del usuario
            console.log('Esperando interacción para autoplay de audio:', err.message);
          });
      }
    };

    startAudio();

    // Si el navegador bloqueó el autoplay sin interacción, se activa con el primer toque, clic, scroll o tecla
    const unlockEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'scroll'];
    const handleFirstGesture = () => {
      startAudio();
    };

    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
      document.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
    });

    return () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
        document.removeEventListener(evt, handleFirstGesture);
      });
      if (audioRef.current) {
        audioRef.current.pause();
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
        })
        .catch((err) => console.error('Error al reproducir audio:', err));
    }
  };

  const handleAcknowledgeAndSilence = () => {
    setHasAcknowledged(true);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Elemento de audio con autoPlay y loop */}
      <audio
        ref={audioRef}
        src="/alarm.mp3"
        autoPlay
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Barra superior de advertencia táctica */}
      <div className="top-hazard-strip" aria-hidden="true" />

      {/* Control discreto de audio en la esquina superior derecha */}
      <button
        className={`corner-audio-toggle ${isPlaying ? 'is-playing' : ''}`}
        onClick={toggleSound}
        aria-label={isPlaying ? "Silenciar alarma" : "Activar alarma"}
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
            <span className="corner-audio-text">Silenciar</span>
          </>
        ) : (
          <>
            <VolumeX size={18} />
            <span className="corner-audio-text">Activar sonido</span>
          </>
        )}
      </button>

      {/* Líneas de escaneo y efectos visuales de alerta */}
      <div className="scanlines" aria-hidden="true" />

      <main className="container">
        {/* Icono de calavera con retícula cibernética táctica (sin glow, diseño nítido) */}
        <div className="icon-stage">
          <div className="reticle-circle" aria-hidden="true" />
          <div className="reticle-circle-inner" aria-hidden="true" />
          <div className="reticle-crosshair-h" aria-hidden="true" />
          <div className="reticle-crosshair-v" aria-hidden="true" />
          <Skull size={200} className="skull-icon" strokeWidth={2} />
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

        {/* Botón de acción combinado */}
        <div className="action-buttons">
          <button
            className={`btn-primary ${hasAcknowledged ? 'acknowledged' : ''}`}
            onClick={handleAcknowledgeAndSilence}
          >
            <CheckCircle size={20} />
            <span>
              {hasAcknowledged
                ? '¡Lección aprendida! Alarma silenciada'
                : 'Aprendí la lección y silenciar alarma'}
            </span>
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
