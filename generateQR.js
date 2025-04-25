import qrcode from 'qrcode';
import readlineSync from 'readline-sync';

// Función para generar el enlace de WhatsApp
function getWhatsAppLink() {
  const phoneNumber = readlineSync.question('Ingresa el número de teléfono de WhatsApp (incluyendo el código de país): ');
  return `https://wa.me/${phoneNumber}`;
}

// Función para generar el código QR
function generateQRCode() {
  const whatsappLink = getWhatsAppLink();
  console.log(`Generando QR para el enlace de WhatsApp: ${whatsappLink}`);

  qrcode.toString(whatsappLink, { type: 'terminal' }, function (err, qrCode) {
    if (err) {
      console.log('Error al generar el código QR:', err);
      return;
    }
    console.log('\nAquí está tu código QR para vincular a WhatsApp:\n');
    console.log(qrCode);
  });
}

generateQRCode();
