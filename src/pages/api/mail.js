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

    console.log(message);

    const data = {
        to: 'fullstophh@gmail.com',
        from: 'HelpinHand@fullstop.website',
        subject: `HelpinHand ${body.email}`,
        text: message,
        html: message.replace(/\r\n/g, '<br>')
    };

    mail.send(data);

    res.status(200).json({ status: 'Ok' });
}