const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req, res) => {
    const body = JSON.parse(req.body);

    const message = `
        Submetida por: ${body.accuser}\r\n
        Alvo: ${body.accused}\r\n
        Razão: ${body.reason}\r\n
        Mensagem: ${body.description}
        `;

    const data = {
        to: 'fullstophh@gmail.com',
        from: 'Denuncias@fullstop.website',
        subject: `Denúncia { ${body.accuser} -> ${body.accused} }`,
        text: message,
        html: message.replace(/\r\n/g, '<br>')
    };

    mail.send(data);

    res.status(200).json({ status: 'Ok' });
}