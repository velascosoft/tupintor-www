const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/+5493518500253?text=Hola,%20quisiera%20pedir%20un%20presupuesto"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition transform hover:scale-110"
            aria-label="Contactar por WhatsApp"
        >
            <i className="fa-brands fa-whatsapp text-3xl"></i>
        </a>
    )
}

export default WhatsAppButton;