import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactoEmail = async ( req, res) => {
    try {
        const { nombre, email, telefono, mensaje } = req.body;

        if( !nombre  || !email || !telefono || !mensaje) {
            return res.status(400).json( {
                message: "Todos los campos son obligatorios"
            });
        }

        const response = await resend.emails.send({
            from: "CF HOME & DECO <contacto@cfhomedeco.com>",
            to: "cfhomeydeco@gmail.com",
            subject: "Nuevo mensaje de contacto",
            html: `
                <h2>Nuevo Mensaje de Contacto</h2>
                <p><stong>Nombre:</strong>${nombre}</p>
                <p><stong>Email:</strong>${email}</p>
                <p><stong>Teléfono:</strong>${telefono}</p>
                <p><stong>Mensaje:</strong>${mensaje}</p>
                `,
        });

        res.status(200).json({
            ok: true,
            message: "Mensaje Enviado Correctamente, en breve nos pondremos en contacto contigo",
        });
    } catch (error) {
        console.error("Error enviando email:", error);
        res.status(500).json({
            ok: false,
            message: "Error al enviar el mensaje",
        });
    }
};