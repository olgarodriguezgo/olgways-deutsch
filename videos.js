const VIDEOS = [
  {
    id: "gw_BUDk610w",
    titulo: "Real German Conversations: Funny Stories & Everyday Humor",
    canal: "Easy German",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=gw_BUDk610w",
    descripcion: "Alemán real y natural en conversaciones cotidianas con humor — perfecto para entrenar el oído desde el principio."
  },
  {
    id: "FkVBDpt7_50",
    titulo: "How To Pay The Bill In German",
    canal: "Babbel",
    tipo: "vocabulario",
    url: "https://www.youtube.com/watch?v=FkVBDpt7_50",
    descripcion: "Aprende el vocabulario esencial para pagar en un restaurante o tienda — situación que usarás desde el primer día en Alemania."
  },
  {
    id: "uzNrP5ZyH0A",
    titulo: "Learn German the Natural Way | Walk & Talk Through the City",
    canal: "Deutsch mit Lari",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=uzNrP5ZyH0A",
    descripcion: "Escucha alemán real mientras paseas por una ciudad alemana — comprehensible input en su forma más natural y relajada."
  },
  {
    id: "2CMBqqf9dXU",
    titulo: "Learn German with Sponge Bob Fun A1-B2 (Part 2)",
    canal: "GermanLearning",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=2CMBqqf9dXU",
    descripcion: "Bob Esponja en alemán: diálogos simples, voces claras y contexto visual que hace que entender sea mucho más fácil y divertido."
  },
  {
    id: "gWaAqkNmbWE",
    titulo: "Harry Potter Deutsch mit Filmen",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=gWaAqkNmbWE",
    descripcion: "Aprende alemán con una historia que ya conoces — el contexto familiar de Harry Potter hace que el input sea mucho más comprensible."
  },
  {
    id: "gl46OAObDtw",
    titulo: "Easy German Vlog for Absolute Beginners | Comprehensible Input",
    canal: "Deutsch mit Lari",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=gl46OAObDtw",
    descripcion: "Diseñado específicamente para principiantes absolutos — habla lenta, vocabulario básico y mucho contexto visual."
  },
  {
    id: "bOcOuW1iVmI",
    titulo: "How To Ask And Respond To How Are You In German",
    canal: "Babbel",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=bOcOuW1iVmI",
    descripcion: "Domina las frases más usadas en cualquier conversación alemana — el punto de partida perfecto para hablar con nativos."
  },
  {
    id: "KgJDdq3h5tE",
    titulo: "Sie And Du In German",
    canal: "Babbel",
    tipo: "gramática práctica",
    url: "https://www.youtube.com/watch?v=KgJDdq3h5tE",
    descripcion: "Entiende cuándo usar el formal y el informal en alemán — una distinción clave para no meter la pata en situaciones reales."
  },
  {
    id: "xoFGJis-Pgs",
    titulo: "Wonderful German Words | Compound Nouns",
    canal: "Babbel",
    tipo: "vocabulario",
    url: "https://www.youtube.com/watch?v=xoFGJis-Pgs",
    descripcion: "Descubre cómo el alemán construye palabras compuestas larguísimas — una vez que entiendes el truco, el vocabulario se expande solo."
  },
  {
    id: "BBS4sdcIxGI",
    titulo: "How To Introduce Yourself In German",
    canal: "Babbel",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=BBS4sdcIxGI",
    descripcion: "Las primeras frases que necesitas en alemán: cómo presentarte, de dónde eres y qué haces — esencial para cualquier principiante."
  },
  {
    id: "OpzoxPO9ITQ",
    titulo: "Basic Question Words In German",
    canal: "Babbel",
    tipo: "vocabulario",
    url: "https://www.youtube.com/watch?v=OpzoxPO9ITQ",
    descripcion: "Wer, was, wo, wann, wie, warum — las palabras interrogativas son la base de cualquier conversación en alemán."
  },
  {
    id: "g4WP3C5OlKU",
    titulo: "Three Ways To Pronounce The German E",
    canal: "Babbel",
    tipo: "pronunciación",
    url: "https://www.youtube.com/watch?v=g4WP3C5OlKU",
    descripcion: "La vocal E es una de las más traicioneras del alemán — hoy aprendes sus tres pronunciaciones para sonar mucho más natural."
  },
  {
    id: "CGCCP4dyjh8",
    titulo: "How To Order Food And Drinks In German",
    canal: "Babbel",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=CGCCP4dyjh8",
    descripcion: "Pide comida y bebidas en alemán con confianza — frases claras que funcionan en cualquier restaurante o bar en Alemania."
  },
  {
    id: "StDKSGorUBU",
    titulo: "Learn German with Movies: Harry Potter and the Philosopher's Stone",
    canal: "FluentU German",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=StDKSGorUBU",
    descripcion: "Aprende vocabulario y expresiones reales a través de escenas de Harry Potter con explicaciones detalladas en inglés."
  },
  {
    id: "r8HiWsBe5ko",
    titulo: "100 Words You Should Know When Coming to Germany",
    canal: "Easy German",
    tipo: "vocabulario",
    url: "https://www.youtube.com/watch?v=r8HiWsBe5ko",
    descripcion: "100 palabras imprescindibles para sobrevivir en Alemania — el vocabulario más práctico y frecuente en la vida real."
  },
  {
    id: "a4KDs_6WeGw",
    titulo: "How Germans Express Their Love",
    canal: "Easy German",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=a4KDs_6WeGw",
    descripcion: "Descubre cómo los alemanes expresan el amor y el afecto — cultura y vocabulario emocional que no encontrarás en un libro de texto."
  },
  {
    id: "GI2J3P5yCxo",
    titulo: "Stop Translating German. Do This Instead!",
    canal: "Speak Fluent German",
    tipo: "gramática práctica",
    url: "https://www.youtube.com/watch?v=GI2J3P5yCxo",
    descripcion: "Cambia tu forma de aprender: en lugar de traducir palabra a palabra, empieza a pensar directamente en alemán desde hoy."
  },
  {
    id: "Qydz5lGVfSk",
    titulo: "100 Easy German Phrases for Daily Life",
    canal: "Speak Fluent German",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=Qydz5lGVfSk",
    descripcion: "100 frases útiles para el día a día en alemán — apréndetelas y tendrás una base sólida para cualquier situación cotidiana."
  },
  {
    id: "T8uH_LluaFM",
    titulo: "How to Order Food in German - Vocabulary and Phrases",
    canal: "ExpertlyGerman",
    tipo: "vocabulario",
    url: "https://www.youtube.com/watch?v=T8uH_LluaFM",
    descripcion: "Vocabulario específico para pedir comida: menú, alérgenos, cuenta y más — todo lo que necesitas en un restaurante alemán."
  },
  {
    id: "jUOvnHOsvXM",
    titulo: "How to order Coffee in Germany",
    canal: "Easy German",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=jUOvnHOsvXM",
    descripcion: "Los alemanes se toman el café muy en serio — aprende la cultura del café y el vocabulario para pedirlo como una local."
  },
  {
    id: "_gxGdebi75A",
    titulo: "1 Tag mit mir in Hamburg auf der OMR - Alltagsdeutsch",
    canal: "Learn German Fast",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=_gxGdebi75A",
    descripcion: "Un día completo en Hamburgo en alemán cotidiano — ve cómo es la vida real en Alemania mientras entrenas el oído."
  },
  {
    id: "nwssCpXoe-4",
    titulo: "22 Useful German Sentences For Ordering Food",
    canal: "Easy German",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=nwssCpXoe-4",
    descripcion: "22 frases listas para usar en cualquier restaurante o café alemán — después de este vídeo, pedir comida no te dará ningún miedo."
  },
  {
    id: "d2XXhIVjmTc",
    titulo: "Learn how to order food in a German restaurant",
    canal: "YourGermanTeacher",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=d2XXhIVjmTc",
    descripcion: "Practica una conversación completa en un restaurante alemán — desde pedir mesa hasta pagar la cuenta."
  },
  {
    id: "h2Y15K_CuSE",
    titulo: "When to Use nach vs zu and in",
    canal: "Easy German",
    tipo: "gramática práctica",
    url: "https://www.youtube.com/watch?v=h2Y15K_CuSE",
    descripcion: "Nach, zu, in — tres preposiciones que confunden a todos los estudiantes. Hoy las dominas con ejemplos reales del idioma."
  },
  {
    id: "AwyA7GzGlvE",
    titulo: "How to Order in a German Restaurant",
    canal: "Learn German with Anja",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=AwyA7GzGlvE",
    descripcion: "Anja te explica paso a paso cómo pedir en un restaurante alemán de forma natural — ideal para practicar antes de tu próxima visita."
  },
  {
    id: "tmfTzSLPAM4",
    titulo: "10 Minuten Sprechen mit mir - Alltagsdeutsch",
    canal: "Learn German Fast",
    tipo: "conversación",
    url: "https://www.youtube.com/watch?v=tmfTzSLPAM4",
    descripcion: "10 minutos de conversación en alemán cotidiano a ritmo moderado — entrena el listening y el vocabulario del día a día."
  },
  {
    id: "6fnaS_gx66M",
    titulo: "Conversation for Learning German A1.2",
    canal: "Learn German with Lengura",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=6fnaS_gx66M",
    descripcion: "Diálogos pensados exactamente para tu nivel A1 — vocabulario controlado, pronunciación clara y situaciones cotidianas reales."
  },
  {
    id: "3rlnjRDj9Uo",
    titulo: "Easy German Dialogue for Beginners A1",
    canal: "Learn German with Lengura",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=3rlnjRDj9Uo",
    descripcion: "Diálogos cortos y claros para principiantes absolutos — la mejor forma de acostumbrar el oído al ritmo del alemán real."
  },
  {
    id: "Ffqc_GEhBqw",
    titulo: "How to Swear in German Part 1 - Deutsche Schimpfwörter",
    canal: "Learn German with Anja",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=Ffqc_GEhBqw",
    descripcion: "Los insultos y palabrotas que los alemanes usan de verdad — cultura real del idioma que ningún libro de texto te enseña."
  },
  {
    id: "q1Qpa07wPb0",
    titulo: "How to Buy a Train Ticket in Germany",
    canal: "Learn German with Anja",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=q1Qpa07wPb0",
    descripcion: "Comprar un billete de tren en Alemania puede ser complicado — aprende el vocabulario y el proceso antes de llegar."
  },
  {
    id: "0wrQeWBmY90",
    titulo: "How to Order at a German Bakery Like a Local",
    canal: "Learn German with Anja",
    tipo: "cultura",
    url: "https://www.youtube.com/watch?v=0wrQeWBmY90",
    descripcion: "Las panaderías alemanas son sagradas — aprende a pedir tu Brötchen favorito y a sonar como una local desde el primer día."
  },
  {
    id: "Bc_TbVo--7c",
    titulo: "Learn German Naturally - After Work in Germany, Supermarket and Cooking",
    canal: "Deutsch mit Lari",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=Bc_TbVo--7c",
    descripcion: "Después del trabajo, supermercado y cocinar — alemán natural en las rutinas del día a día más habituales."
  },
  {
    id: "LReQ8cWfo7U",
    titulo: "Learn German with Sponge Bob Fun A1-A2",
    canal: "GermanLearning",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=LReQ8cWfo7U",
    descripcion: "El nivel A1-A2 perfecto: diálogos simples de Bob Esponja que enganchan y hacen que aprender alemán sea divertido."
  },
  {
    id: "nzKixpEEmh0",
    titulo: "Learn German with Sponge Bob Fun A2-B2 Part 3",
    canal: "GermanLearning",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=nzKixpEEmh0",
    descripcion: "Sigue avanzando con Bob Esponja — vocabulario más rico y situaciones más variadas a medida que tu nivel sube."
  },
  {
    id: "96okD8CGQEk",
    titulo: "Harry Potter - Learn German along movies",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=96okD8CGQEk",
    descripcion: "Aprende alemán con Harry Potter — el contexto de la historia hace que el vocabulario nuevo sea mucho más fácil de recordar."
  },
  {
    id: "YO9J-tvTA48",
    titulo: "Harry Potter - Learn German along movies 2",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=YO9J-tvTA48",
    descripcion: "Segunda parte del aprendizaje con Harry Potter — continúa construyendo vocabulario con escenas que ya conoces."
  },
  {
    id: "FBRT21T2fNk",
    titulo: "Harry Potter - Learn German along movies 3",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=FBRT21T2fNk",
    descripcion: "Más magia y más alemán — el método de aprender con películas conocidas sigue demostrando su efectividad en este tercer episodio."
  },
  {
    id: "zjPRnTKM1Lk",
    titulo: "Harry Potter - Learn German along movies 4",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=zjPRnTKM1Lk",
    descripcion: "El alemán de Hogwarts sigue — cada escena refuerza vocabulario ya visto y presenta expresiones nuevas en contexto real."
  },
  {
    id: "u-88CUdfW3A",
    titulo: "Harry Potter - Learn German along movies 5",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=u-88CUdfW3A",
    descripcion: "Quinto capítulo de alemán con Harry Potter — la repetición en contexto es uno de los métodos más efectivos para memorizar."
  },
  {
    id: "Nw2i0dHlr4s",
    titulo: "Harry Potter - Learn German with movies",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=Nw2i0dHlr4s",
    descripcion: "Más alemán con el mundo de Harry Potter — a estas alturas tu oído ya empieza a reconocer patrones del idioma de forma natural."
  },
  {
    id: "w7FaepD09-4",
    titulo: "Friends 1_1 Deutsch mit Filmen",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=w7FaepD09-4",
    descripcion: "Friends en alemán: conversaciones cotidianas, humor natural y vocabulario del alemán real — perfecto para entrenar el listening."
  },
  {
    id: "fKZQTUbrI8o",
    titulo: "Deutsch mit Filmen",
    canal: "GermanwithMarina",
    tipo: "listening",
    url: "https://www.youtube.com/watch?v=fKZQTUbrI8o",
    descripcion: "Aprende alemán con películas y series que ya conoces — el método más natural y entretenido para absorber el idioma."
  }
];
