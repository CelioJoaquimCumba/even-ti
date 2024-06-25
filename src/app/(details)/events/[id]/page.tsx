import { Button } from "@/app/components/atoms/button";

import DataWaveBackground from "@/../assets/images/datawave-backgrond.png"
import DataWaveEvent from "@/../assets/images/datawave-event.png"
import Image from "next/image";


const event = {
    background: DataWaveBackground.src,
    logo: DataWaveEvent.src,
    title: "DataWave",
    description: "Data Wave é uma conferência sobre Dados e ramo de Inteligência Artificial que irá contar com painéis, palestras e sessões práticas denominadas codelabs, de modo a garantir que os participantes possam ter uma contextualização sobre a relevância do campo de ciência de dados, entender conceitos básicos e poder criar os seus primeiros modelos."
}
export default function EventPage() {
    const {title, description, background, logo} = event
    const src = DataWaveBackground.src
    return (
        <div className="flex flex-col flex-grow self-stretch overflow-auto gap-4 md:gap-16">
            <section className={`flex flex-col self-stretch rounded-md justify-center items-center text-white text-center gap-4 bg-cover`} style={{ backgroundImage: `url(${background})` }} >
                <div className="flex flex-col flex-grow self-stretch rounded-md justify-center items-center gap-4 bg-black bg-opacity-50 py-24">
                    <h2 className="text-2xl md:text-5xl">{title}</h2>
                    <p className="md:text-2xl">Explorando o Potencial da Ciência de Dados e Inteligência Artificial</p>
                    <p className="md:text-2xl">Event Date</p>
                    <p className="md:text-2xl">Event Location</p>
                    <Button variant={"secondary"}>Reservar bilhete</Button>
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">O que é  {title}</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <Image src={logo} alt={title} width={300} height={300} className=" w-full md:w-72 rounded-md" />
                    <p className="md:text-lg">
                        {description}
                    </p>
                </div>
            </section>
        </div>
    );
}