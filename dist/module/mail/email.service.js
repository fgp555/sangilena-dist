"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC } = process.env;
// console.log({ MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC });
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            secure: true,
            auth: {
                user: MAIL_USER_FROM,
                pass: MAIL_PASS_FROM,
            },
            // tls: {
            //   rejectUnauthorized: false, // ⚠️ Solo usar temporalmente si tienes error de certificado
            // },
        });
    }
    async sendContactEmail(data) {
        const { name, email, subject, message, currentUrl } = data;
        const bodyMessage = `\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}\nEnviado desde: ${currentUrl}`;
        const userMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: email,
            subject: subject || "Gracias por contactarnos",
            text: `Gracias por escribirnos, te responderemos pronto.${bodyMessage}`,
        };
        const ccMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: MAIL_USER_TO_CC,
            subject: "Tienes un nuevo formulario",
            text: `Un usuario ha enviado un nuevo formulario.${bodyMessage}`,
        };
        // Enviar ambos correos
        await this.transporter.sendMail(userMessage);
        await this.transporter.sendMail(ccMessage);
    }
    async sendFeedbackEmail(data) {
        const { name, email, whatsapp, birthday, howDidYouKnowUs, socialMediaSource, branchVisited, waiterName, experienceRating, improvementSuggestions, clientCode, createdAt, } = data;
        const mailImg = branchVisited === "sangilena-campestre"
            ? "https://i.postimg.cc/L86BLXVQ/mail-sangilena-campestre.webp"
            : "https://i.postimg.cc/K8q7N2qG/mail-sangilena-bga.webp";
        // 🧑‍💼 Admin message
        const adminBody = `
  📬 Nuevo feedback recibido:
  
  🕒 Fecha: ${createdAt.toLocaleString("es-PE")}
  🏷️ Código cliente: ${clientCode}
  
  👤 Nombre: ${name}
  📧 Correo: ${email}
  📱 WhatsApp: ${whatsapp}
  🎂 Cumpleaños: ${birthday}
  📍 Sede: ${branchVisited}
  👨‍🍳 Mesero: ${waiterName || "No especificado"}
  
  🗣️ ¿Cómo nos conoció?: ${howDidYouKnowUs}
  🔗 Fuente (Red social): ${socialMediaSource || "N/A"}
  
  ⭐ Calificación: ${experienceRating}/5
  📝 Sugerencias: ${improvementSuggestions || "Ninguna"}
  `;
        const adminMessage = {
            from: `"Sistema Feedback" <${MAIL_USER_FROM}>`,
            to: MAIL_USER_TO_CC,
            subject: `📩 Nuevo Feedback de ${name}`,
            text: adminBody,
        };
        // 👤 Cliente message con HTML e imagen
        const userBodyHtml = `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>¡Gracias por compartir tu experiencia con nosotros, ${name}! 🎉</h2>
        <p>🎁 Mira lo que has ganado: queremos invitarte a unos <strong>deliciosos deditos de queso</strong>.</p>
        <p>Solo muestra este código al cajero y disfruta de esta delicia:</p>
        <h1 style="background: #f4f4f4; display: inline-block; padding: 10px 20px; border-radius: 10px;">${clientCode}</h1>
        <br/><br/>
        <img src="${mailImg}" alt="Premio" style="max-width: 100%; height: auto; border-radius: 12px;" />
        <p style="margin-top: 30px;">Esperamos verte pronto.<br/>Atentamente,<br/><strong>Equipo de atención al cliente</strong></p>
      </div>
    `;
        const clientMessage = {
            from: `"Equipo de Atención" <${MAIL_USER_FROM}>`,
            to: email,
            subject: "🎁 ¡Gracias por tu opinión! Este es tu premio",
            html: userBodyHtml,
        };
        // Enviar ambos correos
        await this.transporter.sendMail(adminMessage);
        await this.transporter.sendMail(clientMessage);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map