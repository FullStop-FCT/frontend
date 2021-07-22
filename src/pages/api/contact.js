const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req, res) => {
    const body = JSON.parse(req.body);

    const message = `
        Nome: ${body.nome}\r\n
        Email: ${body.email}\r\n
        Assunto: ${body.assunto}\r\n
        Mensagem: ${body.mensagem}
        `;

    const data = {
        to: 'fullstophh@gmail.com',
        from: 'Apoio@fullstop.website',
        subject: `Nova mensagem de ${body.nome}`,
        text: message,
        html: message.replace(/\r\n/g, '<br>')
    };

    mail.send(data);

    res.status(200).json({ status: 'Ok' });
}