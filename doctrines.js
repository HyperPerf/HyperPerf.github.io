export const STOIC_MOVES = [
    // Niveau 1
    {
        id: "dichotomie",
        label: "Dichotomie du Contrôle",
        level: 1,
        baseDmg: 12,
        precision: 0.95,
        focus: 5,
        quotes: [
            "« Ce qui dépend de toi, c'est ton opinion, ton impulsion, ton désir. Le reste n'est que fumée. » — Marc Aurèle",
            "« La liberté de l'homme consiste à faire ce qu'il doit faire. » — Épictète",
            "« Ne cherche pas à ce que les événements arrivent comme tu le souhaites, mais souhaite qu'ils arrivent comme ils arrivent. » — Épictète",
            "« La dichotomie du contrôle est la clé de la sérénité. » — Marc Aurèle",
            "« Le sage ne s'étonne de rien. » — Marc Aurèle"
        ],
        gameplay:
            "Inflige des dégâts modérés tout en rappelant la distinction entre ce qui dépend de nous et ce qui n'en dépend pas."
    },
    {
        id: "nature",
        label: "Suivre la Nature",
        level: 1,
        baseDmg: 15,
        precision: 0.88,
        focus: 6,
        quotes: [
            "« Agis selon la raison universelle qui traverse toute chose. » — Marc Aurèle",
            "« Vivre conformément à la nature, c'est vivre selon la raison. » — Zénon de Cition",
            "« La nature a fait les hommes les uns pour les autres. » — Marc Aurèle",
            "« Suis ton chemin en harmonie avec le Logos. » — Chrysippe",
            "« La nature est notre meilleur guide. » — Sénèque"
        ],
        gameplay: "Attaque qui rappelle l'importance d'agir en accord avec la nature et la raison universelle."
    },
    {
        id: "pneuma",
        label: "Souffle Vital",
        level: 1,
        baseDmg: 10,
        precision: 0.92,
        focus: 4,
        quotes: [
            "« Tout ce qui existe est lié par une tension rationnelle, un souffle créateur. » — Chrysippe",
            "« Le pneuma est le principe vital qui unit toutes choses. » — Zénon de Cition",
            "« Le souffle de vie est la manifestation du Logos. » — Cléanthe",
            "« Tout est imprégné de raison et de souffle vital. » — Marc Aurèle",
            "« Le feu créateur anime l'univers entier. » — Héraclite (interprétation stoïcienne)"
        ],
        gameplay: "Attaque légère qui symbolise l'interconnexion de toutes choses par le souffle vital (pneuma)."
    },
    {
        id: "citadelle",
        label: "Citadelle Intérieure",
        level: 1,
        baseDmg: 8,
        precision: 0.98,
        focus: 3,
        quotes: [
            "« L'esprit est une forteresse que nul ne peut forcer, sauf toi-même. » — Marc Aurèle",
            "« Le vrai bonheur est intérieur. » — Sénèque",
            "« Personne ne peut te blesser sans ton consentement. » — Marc Aurèle",
            "« La citadelle intérieure est impénétrable. » — Épictète",
            "« La sagesse est un refuge sûr. » — Sénèque"
        ],
        gameplay: "Défense solide qui représente la protection de l'âme par la raison."
    },

    // Niveau 2
    {
        id: "indifferents",
        label: "Doctrine des Indifférents",
        level: 2,
        baseDmg: 28,
        precision: 0.75,
        focus: 12,
        quotes: [
            "« La richesse, la santé, la douleur : tout cela est indifférent au sage. » — Sénèque",
            "« Les choses extérieures ne sont ni bonnes ni mauvaises en soi. » — Marc Aurèle",
            "« Ce qui compte, ce n'est pas ce que tu possèdes, mais comment tu l'utilises. » — Épictète",
            "« Les indifférents sont comme les vagues : ils montent et descendent, mais le sage reste stable. » — Chrysippe",
            "« La véritable valeur réside dans la vertu, non dans les possessions. » — Zénon de Cition"
        ],
        gameplay: "Attaque puissante qui rappelle que les biens extérieurs sont indifférents pour le sage."
    },
    {
        id: "porte",
        label: "La Porte Ouverte",
        level: 2,
        baseDmg: 35,
        precision: 0.7,
        focus: 15,
        quotes: [
            "« Si la fumée devient insupportable, je quitte la pièce. La mort est une porte ouverte. » — Sénèque",
            "« La vie n'est pas un bien, mais un prêt. » — Marc Aurèle",
            "« La mort n'est qu'un changement de lieu. » — Épictète",
            "« La porte de la liberté est toujours ouverte. » — Marc Aurèle",
            "« La mort n'est pas un mal, car elle n'existe pas pour nous quand nous sommes, et nous n'existons plus quand elle vient. » — Épictète"
        ],
        gameplay: "Attaque qui symbolise l'acceptation stoïcienne de la mort comme libération."
    },
    {
        id: "sympathie",
        label: "Sympathie Universelle",
        level: 2,
        baseDmg: 25,
        precision: 0.8,
        focus: 10,
        quotes: [
            "« Ce qui n'est pas utile à la ruche ne l'est pas à l'abeille. » — Marc Aurèle",
            "« Nous sommes tous membres les uns des autres. » — Sénèque",
            "« Ce qui est bon pour la cité est bon pour l'individu. » — Zénon de Cition",
            "« L'humanité est une seule grande famille. » — Marc Aurèle",
            "« La sympathie universelle est la marque du sage. » — Chrysippe"
        ],
        gameplay: "Attaque qui rappelle l'interdépendance de toutes choses dans l'univers."
    },
    {
        id: "brieve",
        label: "Brièveté de la Vie",
        level: 2,
        baseDmg: 32,
        precision: 0.72,
        focus: 14,
        quotes: [
            "« Ce n'est pas que nous disposions de peu de temps, c'est que nous en perdons beaucoup. » — Sénèque",
            "« La vie est brève, mais la vertu est éternelle. » — Marc Aurèle",
            "« Chaque jour est une vie en miniature. » — Sénèque",
            "« Le temps s'enfuit, irrévocable. » — Marc Aurèle",
            "« La brièveté de la vie doit nous inciter à vivre vertueusement. » — Épictète"
        ],
        gameplay: "Attaque qui rappelle l'importance de bien utiliser le temps qui nous est donné."
    },

    // Niveau 3
    {
        id: "amorfati",
        label: "Amor Fati",
        level: 3,
        baseDmg: 65,
        precision: 0.55,
        focus: 25,
        quotes: [
            "« N'espère pas que les événements arrivent comme tu le souhaites, mais souhaite qu'ils arrivent comme ils arrivent. » — Épictète",
            "« Aime ton destin, quelle qu'en soit la nature. » — Marc Aurèle",
            "« L'amor fati est l'acceptation totale de ce qui arrive. » — Friedrich Nietzsche (inspiré du stoïcisme)",
            "« Le destin est notre ami si nous savons l'accueillir. » — Sénèque",
            "« Tout ce qui arrive arrive comme il doit arriver. » — Chrysippe"
        ],
        gameplay: "Attaque puissante qui représente l'acceptation totale du destin."
    },
    {
        id: "regard",
        label: "Regard de haut",
        level: 3,
        baseDmg: 70,
        precision: 0.5,
        focus: 28,
        quotes: [
            "« Élève-toi et contemple d'en haut : les banquets, les noces, les funérailles ne sont que vanité. » — Marc Aurèle",
            "« Le sage voit les choses avec le regard des dieux. » — Chrysippe",
            "« Contemple le monde depuis la citadelle de ta raison. » — Épictète",
            "« La perspective change tout. » — Sénèque",
            "« Le regard du sage embrasse l'univers entier. » — Zénon de Cition"
        ],
        gameplay: "Attaque qui symbolise la vision élargie du sage stoïcien."
    },
    {
        id: "epyrose",
        label: "Épyrose Cosmique",
        level: 3,
        baseDmg: 85,
        precision: 0.45,
        focus: 30,
        quotes: [
            "« Le monde entier se résout en feu pour renaître pur, dans un éternel retour. » — Héraclite (interprétation stoïcienne)",
            "« Tout est feu et tout revient au feu. » — Chrysippe",
            "« L'épyrose est la purification par le feu. » — Cléanthe",
            "« Le cosmos est un éternel recommencement. » — Marc Aurèle",
            "« La destruction est aussi une renaissance. » — Sénèque"
        ],
        gameplay: "Attaque ultime qui représente le cycle cosmique de destruction et de renaissance."
    }
];
export const BUDDHIST_MOVES = [
    // Niveau 1
    {
        id: "dukkha",
        label: "Reconnaissance de Dukkha",
        level: 1,
        baseDmg: 10,
        precision: 0.9,
        focus: 7,
        quotes: [
            "« La vie est souffrance, car tout est impermanent et insatisfaisant. » — Bouddha",
            "« La naissance est souffrance, la vieillesse est souffrance, la maladie est souffrance, la mort est souffrance. » — Dhammapada",
            "« La souffrance est la première noble vérité. » — Bouddha",
            "« Tout ce qui naît est voué à la souffrance. » — Samyutta Nikaya",
            "« La souffrance est le lot commun de tous les êtres. » — Bouddha"
        ],
        gameplay:
            "Inflige des dégâts modérés, mais réduit légèrement la concentration de l'adversaire (effet de prise de conscience)."
    },
    {
        id: "tanha",
        label: "Extinction de Tanha",
        level: 1,
        baseDmg: 8,
        precision: 0.95,
        focus: 5,
        quotes: [
            "« Le désir est la racine de toute souffrance. » — Bouddha",
            "« L'extinction du désir mène à la libération. » — Dhammapada",
            "« Tanha est le feu qui consume l'esprit. » — Bouddha",
            "« Le désir est comme une flamme : plus on le nourrit, plus il brûle. » — Samyutta Nikaya",
            "« La soif est l'origine de toute douleur. » — Bouddha"
        ],
        gameplay: "Réduit la capacité de l'adversaire à accumuler de la concentration au tour suivant."
    },
    {
        id: "anatta",
        label: "Non-Soi (Anatta)",
        level: 1,
        baseDmg: 12,
        precision: 0.85,
        focus: 8,
        quotes: [
            "« Rien n'a d'essence permanente, pas même le 'moi'. » — Bouddha",
            "« Ce que nous appelons 'moi' n'est qu'une illusion. » — Anatta Lakkhana Sutta",
            "« Le soi est une construction de l'esprit. » — Bouddha",
            "« Il n'y a pas d'âme permanente, seulement des agrégats changeants. » — Abhidharma",
            "« Le 'moi' est comme une rivière : toujours en mouvement, jamais le même. » — Bouddha"
        ],
        gameplay: "Ignore les boucliers et inflige des dégâts directs à la vitalité."
    },
    {
        id: "sati",
        label: "Pratique de Sati",
        level: 1,
        baseDmg: 0,
        precision: 1.0,
        focus: -10, // Restaure la concentration
        quotes: [
            "« La pleine conscience dissout l'illusion et apaise l'esprit. » — Satipatthana Sutta",
            "« Sati est la clé de la libération. » — Bouddha",
            "« La conscience du moment présent est le chemin vers la sagesse. » — Dhammapada",
            "« Observer sans jugement, c'est voir la réalité telle qu'elle est. » — Bouddha",
            "« La pleine conscience est le miroir de la sagesse. » — Anapanasati Sutta"
        ],
        gameplay: "Restaure 10 points de concentration et annule l'aporie."
    },

    // Niveau 2
    {
        id: "magga",
        label: "Noble Sentier Octuple",
        level: 2,
        baseDmg: 25,
        precision: 0.8,
        focus: 12,
        quotes: [
            "« La voie vers la cessation de la souffrance passe par la sagesse, l'éthique et la concentration. » — Bouddha",
            "« Le Noble Sentier Octuple est le chemin vers la libération. » — Dhammacakkappavattana Sutta",
            "« La voie du milieu évite les extrêmes. » — Bouddha",
            "« La sagesse, la moralité et la concentration sont les trois piliers de la voie. » — Visuddhimagga",
            "« Marcher sur la voie, c'est déjà être libéré. » — Bouddha"
        ],
        gameplay: "Augmente la précision des attaques au tour suivant."
    },
    {
        id: "karuna",
        label: "Karuna (Compassion)",
        level: 2,
        baseDmg: 0,
        precision: 1.0,
        focus: 15,
        heal: 15,
        quotes: [
            "« La compassion pour tous les êtres est la clé de la libération. » — Bouddha",
            "« Karuna est l'amour qui voit la souffrance et agit pour la soulager. » — Metta Sutta",
            "« La compassion est le cœur de l'éveil. » — Bouddha",
            "« Voir la souffrance des autres comme la sienne propre. » — Bodhicitta",
            "« La vraie compassion n'a pas de limites. » — Dalai Lama (inspiré du bouddhisme)"
        ],
        gameplay: "Soigne 15 points de vitalité et réduit l'aporie de l'adversaire."
    },
    {
        id: "sunyata",
        label: "Vacuité (Sunyata)",
        level: 2,
        baseDmg: 30,
        precision: 0.7,
        focus: 18,
        quotes: [
            "« Tout est vide de nature propre, même la souffrance. » — Nagarjuna",
            "« La vacuité est la porte de toutes les possibilités. » — Heart Sutra",
            "« Ce que nous appelons réalité n'est qu'une convention. » — Bouddha",
            "« La vacuité n'est ni existence ni non-existence. » — Madhyamaka",
            "« Comprendre la vacuité, c'est voir au-delà des apparences. » — Chandrakirti"
        ],
        gameplay: "Inflige des dégâts élevés, mais réduit la concentration du lanceur."
    },

    // Niveau 3
    {
        id: "nirvana",
        label: "Atteinte du Nirvana",
        level: 3,
        baseDmg: 0,
        precision: 1.0,
        focus: 30,
        quotes: [
            "« La cessation de la souffrance est possible par l'extinction du désir. » — Bouddha",
            "« Le Nirvana est la paix ultime, au-delà de toute description. » — Dhammapada",
            "« Comme une flamme qui s'éteint, le sage libéré disparaît dans la paix. » — Bouddha",
            "« Le Nirvana n'est ni existence ni non-existence, mais la fin de la souffrance. » — Nagarjuna",
            "« Atteindre le Nirvana, c'est comme éveiller d'un rêve. » — Bouddha"
        ],
        gameplay:
            "Met fin à l'aporie, restaure toute la concentration et inflige une pénalité permanente à l'adversaire."
    },
    {
        id: "prajna",
        label: "Sagesse (Prajna)",
        level: 3,
        baseDmg: 50,
        precision: 0.6,
        focus: 25,
        quotes: [
            "« La sagesse voit au-delà des apparences et tranche l'illusion. » — Bouddha",
            "« Prajna est l'épée qui coupe les chaînes de l'ignorance. » — Lankavatara Sutra",
            "« La vraie sagesse est de voir les choses telles qu'elles sont vraiment. » — Bouddha",
            "« La sagesse est comme un miroir : elle reflète la réalité sans la déformer. » — Dogen",
            "« Comprendre la vacuité, c'est atteindre la sagesse ultime. » — Nagarjuna"
        ],
        gameplay: "Inflige des dégâts massifs si l'adversaire est en aporie."
    }
];
export const CYNIC_MOVES = [
    // Niveau 1
    {
        id: "diogene_lanterne",
        label: "Lanterne de Diogène",
        level: 1,
        baseDmg: 12,
        precision: 0.85,
        focus: 6,
        quotes: [
            "« Je cherche un homme. » — Diogène (avec sa lanterne en plein jour)",
            "« La plupart des gens sont des ombres qui se prennent pour des réalités. » — Diogène",
            "« La lanterne éclaire l'hypocrisie des hommes. » — Diogène",
            "« Les hommes se cachent dans l'obscurité de leurs mensonges. » — Diogène",
            "« La vérité est comme la lumière : elle aveugle ceux qui vivent dans l'ombre. » — Diogène"
        ],
        gameplay:
            "Inflige des dégâts et a une chance de révéler les faiblesses de l'adversaire, réduisant sa précision au tour suivant."
    },
    {
        id: "mepris_conventions",
        label: "Mépris des Conventions",
        level: 1,
        baseDmg: 8,
        precision: 0.9,
        focus: 4,
        quotes: [
            "« Pourquoi vivre cachée quand on peut vivre librement ? » — Hipparchie",
            "« Les conventions sont les chaînes des âmes faibles. » — Diogène",
            "« La vraie liberté commence quand on se moque des règles. » — Diogène",
            "« Les conventions sont comme des vêtements : elles cachent la vérité. » — Antisthène",
            "« Vivre selon la nature, c'est se libérer des masques sociaux. » — Diogène"
        ],
        gameplay: "Réduit la capacité de l'adversaire à utiliser des mouvements de niveau supérieur au tour suivant."
    },
    {
        id: "vie_naturelle",
        label: "Vie Naturelle",
        level: 1,
        baseDmg: 0,
        heal: 10,
        precision: 1.0,
        focus: 7,
        quotes: [
            "« La vertu est la seule chose nécessaire au bonheur. » — Antisthène",
            "« Un tonneau et un manteau suffisent au sage. » — Diogène",
            "« La simplicité est la vraie richesse. » — Diogène",
            "« Vivre selon la nature, c'est se contenter de peu. » — Antisthène",
            "« La pauvreté volontaire est la liberté ultime. » — Diogène"
        ],
        gameplay:
            "Restaure de la vitalité et augmente légèrement la concentration, reflétant la simplicité de vie cynique."
    },
    {
        id: "provocation",
        label: "Provocation Cynique",
        level: 1,
        baseDmg: 15,
        precision: 0.8,
        focus: 8,
        quotes: [
            "« Si tu veux te rendre compte de ce qu'est un homme, regarde-toi dans un miroir quand tu es en colère. » — Diogène",
            "« La provocation est le miroir tendu aux hypocrites. » — Diogène",
            "« Les hommes ne supportent pas la vérité crue. » — Diogène",
            "« La colère révèle la vraie nature des gens. » — Antisthène",
            "« Provouer, c'est forcer les masques à tomber. » — Diogène"
        ],
        gameplay: "Inflige des dégâts et a une chance de provoquer une Aporie chez l'adversaire."
    },

    // Niveau 2
    {
        id: "tonneau",
        label: "Vie dans un Tonneau",
        level: 2,
        baseDmg: 0,
        shield: 20,
        precision: 1.0,
        focus: 12,
        quotes: [
            "« Je vis comme un chien, mais au moins je suis libre. » — Diogène",
            "« Mon tonneau est mon palais. » — Diogène",
            "« La vraie richesse est de ne rien posséder. » — Diogène",
            "« Un tonneau suffit à abriter un homme libre. » — Diogène",
            "« Les murs des palais sont des prisons, mon tonneau est la liberté. » — Diogène"
        ],
        gameplay: "Crée un bouclier solide, reflétant l'indifférence aux attaques extérieures."
    },
    {
        id: "autarcie",
        label: "Autarcie Radicale",
        level: 2,
        baseDmg: 22,
        precision: 0.75,
        focus: 10,
        quotes: [
            "« La richesse la plus grande est de ne dépendre de rien. » — Diogène",
            "« L'autarcie est la vraie liberté. » — Antisthène",
            "« Ne rien posséder, c'est posséder tout. » — Diogène",
            "« La dépendance est une chaîne invisible. » — Diogène",
            "« L'homme libre n'a besoin de personne. » — Antisthène"
        ],
        gameplay: "Inflige des dégâts et réduit la capacité de l'adversaire à se soigner."
    },
    {
        id: "chien",
        label: "Comme un Chien",
        level: 2,
        baseDmg: 25,
        precision: 0.7,
        focus: 15,
        quotes: [
            "« Les autres chiens aboient contre leurs ennemis ; moi, je le fais contre mes amis, pour les sauver. » — Diogène",
            "« Vivre comme un chien, c'est vivre sans masques. » — Diogène",
            "« Les chiens sont plus honnêtes que les hommes. » — Diogène",
            "« Aboyer contre les hypocrites est un devoir. » — Diogène",
            "« Un chien mord ceux qui le provoquent, un cynique mord ceux qui mentent. » — Antisthène"
        ],
        gameplay: "Attaque puissante qui ignore partiellement les boucliers adverses."
    },
    {
        id: "cosmopolitisme",
        label: "Cosmopolitisme",
        level: 2,
        baseDmg: 18,
        precision: 0.8,
        focus: 10,
        quotes: [
            "« Je suis un citoyen du monde. » — Diogène",
            "« Les frontières sont des illusions pour les âmes libres. » — Diogène",
            "« La patrie du sage est le monde entier. » — Diogène",
            "« Les lois sont comme des toiles d'araignée : elles retiennent les petits et sont brisées par les grands. » — Diogène",
            "« Un vrai citoyen n'a pas besoin de passeport. » — Diogène"
        ],
        gameplay: "Inflige des dégâts et augmente la faveur de l'auditoire."
    },

    // Niveau 3
    {
        id: "liberte_absolue",
        label: "Liberté Absolue",
        level: 3,
        baseDmg: 0,
        precision: 1.0,
        focus: -30,
        quotes: [
            "« La liberté est le bien le plus précieux. » — Diogène",
            "« Être libre, c'est ne dépendre de rien ni de personne. » — Diogène",
            "« La vraie liberté commence quand on n'a plus rien à perdre. » — Diogène",
            "« La liberté absolue est l'absence totale de contraintes. » — Antisthène",
            "« Un homme libre est un roi, même dans un tonneau. » — Diogène"
        ],
        gameplay: "Restaure toute la concentration et annule l'Aporie."
    },
    {
        id: "defi_alexandre",
        label: "Défi à Alexandre",
        level: 3,
        baseDmg: 55,
        precision: 0.6,
        focus: 25,
        quotes: [
            "« Ôte-toi de mon soleil. » — Diogène à Alexandre le Grand",
            "« La vraie puissance est dans le mépris du pouvoir. » — Diogène",
            "« Un roi n'est qu'un esclave de son rôle. » — Diogène",
            "« Alexandre cherche la gloire, moi la liberté. » — Diogène",
            "« La grandeur est une illusion, la liberté est réelle. » — Diogène"
        ],
        gameplay: "Attaque puissante qui a une chance de désorienter complètement l'adversaire."
    },
    {
        id: "mendicite",
        label: "Mendicité Philosophique",
        level: 3,
        baseDmg: 0,
        heal: 30,
        precision: 1.0,
        focus: 20,
        quotes: [
            "« La pauvreté est une vertu quand elle est choisie. » — Antisthène",
            "« Mendier, c'est rappeler aux riches leur dépendance. » — Diogène",
            "« La mendicité est un acte de liberté. » — Diogène",
            "« Celui qui n'a rien n'a rien à perdre. » — Diogène",
            "« La vraie richesse est dans le détachement. » — Antisthène"
        ],
        gameplay: "Soigne complètement la vitalité et restaure une grande partie de la concentration."
    },
    {
        id: "ploutos",
        label: "Mépris de Ploutos",
        level: 3,
        baseDmg: 45,
        precision: 0.65,
        focus: 22,
        quotes: [
            "« Je méprise Ploutos (le dieu de la richesse), car la vraie richesse est dans l'âme. » — Diogène",
            "« L'or est une chaîne plus lourde que le fer. » — Diogène",
            "« Les riches sont les vrais mendiants, esclaves de leurs possessions. » — Diogène",
            "« La richesse corrompt l'âme. » — Antisthène",
            "« Ploutos est un dieu aveugle qui ne voit pas la vraie pauvreté. » — Diogène"
        ],
        gameplay: "Inflige des dégâts élevés et réduit la capacité de l'adversaire à utiliser des mouvements coûteux."
    }
];
export const EPICUR_MOVES = [
    // Niveau 1
    {
        id: "clinamen",
        label: "Clinamen",
        level: 1,
        baseDmg: 12,
        precision: 0.85,
        focus: 7,
        quotes: [
            "« Les atomes dévient de leur trajectoire, créant ainsi la liberté dans un monde déterminé. » — Lucrèce",
            "« Le clinamen est la source de tout ce qui existe. » — Épicure",
            "« Une légère déviation change le cours du monde. » — Lucrèce",
            "« Le hasard est la manifestation de la liberté. » — Épicure",
            "« Dans l'infini, une petite déviation fait toute la différence. » — Lucrèce"
        ],
        gameplay: "Inflige des dégâts légers mais a une chance de désorienter l'adversaire."
    },
    {
        id: "tetrapharmakon",
        label: "Tétrapharmakon",
        level: 1,
        baseDmg: 10,
        precision: 0.9,
        focus: 5,
        quotes: [
            "« Les dieux ne sont pas à craindre, la mort n'est rien pour nous, le bien est facile à obtenir, le mal est facile à supporter. » — Épicure",
            "« Le tétrapharmakon est le remède à toutes les peurs. » — Épicure",
            "« La philosophie est une médecine de l'âme. » — Épicure",
            "« La peur des dieux est la source de tous les maux. » — Lucrèce",
            "« La sagesse commence par la libération de la peur. » — Épicure"
        ],
        gameplay: "Réduit la peur de l'adversaire, augmentant légèrement la faveur de l'auditoire."
    },
    {
        id: "jardin",
        label: "Retraite au Jardin",
        level: 1,
        baseDmg: 0,
        heal: 15,
        precision: 1.0,
        focus: 3,
        quotes: [
            "« Cultivons l'amitié et la philosophie dans le calme du Jardin, loin des troubles de la cité. » — Épicure",
            "« Le Jardin est un refuge contre les folies du monde. » — Épicure",
            "« La vraie richesse est dans les plaisirs simples. » — Épicure",
            "« Dans le Jardin, nous trouvons la paix et la raison. » — Métrodore",
            "« Le bonheur est une vie cachée. » — Épicure"
        ],
        gameplay: "Soigne 15 points de vitalité et restaure partiellement la concentration."
    },
    {
        id: "ataraxie",
        label: "Ataraxie",
        level: 1,
        baseDmg: 8,
        shield: 10,
        precision: 0.92,
        focus: 6,
        quotes: [
            "« L'absence de trouble de l'âme est le souverain bien. » — Épicure",
            "« L'ataraxie est le but de toute philosophie. » — Épicure",
            "« Le calme de l'âme est la vraie richesse. » — Métrodore",
            "« La paix intérieure est le seul bien qui ne puisse être enlevé. » — Épicure",
            "« L'ataraxie est la liberté ultime. » — Lucrèce"
        ],
        gameplay: "Crée un bouclier léger et réduit l'aporie de l'adversaire."
    },

    // Niveau 2
    {
        id: "hedone",
        label: "Hédoné Mesurée",
        level: 2,
        baseDmg: 20,
        precision: 0.8,
        focus: 10,
        quotes: [
            "« Le plaisir est le commencement et la fin de la vie heureuse. » — Épicure",
            "« Il faut choisir ses plaisirs avec sagesse. » — Épicure",
            "« Le plaisir modéré est la clé du bonheur durable. » — Métrodore",
            "« La tempérance dans les plaisirs est la vraie sagesse. » — Épicure",
            "« Le plaisir excessif devient douleur. » — Lucrèce"
        ],
        gameplay:
            "Inflige des dégâts modérés et restaure un peu de concentration si le joueur a plus de 50% de vitalité."
    },
    {
        id: "philia",
        label: "Philia (Amitié)",
        level: 2,
        baseDmg: 0,
        heal: 20,
        precision: 1.0,
        focus: 8,
        quotes: [
            "« De tous les biens que la sagesse procure pour le bonheur de la vie, le plus grand est l'amitié. » — Épicure",
            "« L'amitié danse autour du monde, nous appelant tous à nous éveiller à la joie. » — Épicure",
            "« Un ami est un autre moi-même. » — Épicure",
            "« L'amitié est un rempart contre les maux de la vie. » — Métrodore",
            "« Sans amitié, aucun plaisir n'est complet. » — Épicure"
        ],
        gameplay: "Soigne 20 points de vitalité et augmente la faveur de l'auditoire."
    },
    {
        id: "aponia",
        label: "Aponia (Absence de Douleur)",
        level: 2,
        baseDmg: 25,
        precision: 0.75,
        focus: 12,
        quotes: [
            "« L'absence de douleur corporelle et de trouble de l'âme constitue le bonheur. » — Épicure",
            "« La douleur est un signal, non un ennemi. » — Épicure",
            "« La vraie joie est l'absence de souffrance. » — Métrodore",
            "« Le corps doit être soigné pour que l'âme puisse s'épanouir. » — Épicure",
            "« La douleur est un maître sévère mais nécessaire. » — Lucrèce"
        ],
        gameplay: "Réduit la capacité de l'adversaire à infliger des dégâts critiques au tour suivant."
    },
    {
        id: "autarkeia",
        label: "Autarkeia (Autosuffisance)",
        level: 2,
        baseDmg: 18,
        shield: 12,
        precision: 0.82,
        focus: 10,
        quotes: [
            "« Rien ne suffit à celui pour qui le suffisant est peu. » — Épicure",
            "« L'autosuffisance est la vraie liberté. » — Épicure",
            "« Le sage se contente de peu. » — Métrodore",
            "« La richesse est dans le besoin satisfait, non dans l'abondance. » — Épicure",
            "« L'indépendance est le plus grand des trésors. » — Épicure"
        ],
        gameplay: "Crée un bouclier modéré et réduit les besoins en concentration pour les prochains tours."
    },

    // Niveau 3
    {
        id: "eudaimonia",
        label: "Eudaimonia Épicurienne",
        level: 3,
        baseDmg: 0,
        heal: 30,
        precision: 1.0,
        focus: 20,
        quotes: [
            "« Le bonheur est une vie sans trouble, remplie de plaisirs simples et naturels. » — Épicure",
            "« L'eudaimonia est l'aboutissement de la sagesse. » — Épicure",
            "« Le bonheur est un jardin bien cultivé. » — Métrodore",
            "« La vraie joie est dans l'équilibre. » — Épicure",
            "« Le bonheur est un art qui s'apprend. » — Épicure"
        ],
        gameplay: "Soigne 30 points de vitalité, restaure complètement la concentration et annule l'aporie."
    },
    {
        id: "katastematic",
        label: "Plaisirs Katastématiques",
        level: 3,
        baseDmg: 50,
        precision: 0.6,
        focus: 25,
        quotes: [
            "« Les plaisirs stables, ceux qui naissent de l'absence de douleur, sont supérieurs aux plaisirs mouvants. » — Épicure",
            "« Le vrai plaisir est celui qui ne laisse aucune amertume. » — Épicure",
            "« La stabilité de l'âme est le plus grand des plaisirs. » — Métrodore",
            "« Les plaisirs éphémères sont des pièges. » — Lucrèce",
            "« Le plaisir durable est celui qui naît de la modération. » — Épicure"
        ],
        gameplay: "Inflige des dégâts élevés et réduit la capacité de l'adversaire à se soigner."
    },
    {
        id: "prolepsis",
        label: "Prolepsis (Anticipation)",
        level: 3,
        baseDmg: 40,
        precision: 0.7,
        focus: 22,
        quotes: [
            "« Nos anticipations naturelles nous guident vers le bonheur. » — Épicure",
            "« La prolepsis est la base de toute connaissance. » — Épicure",
            "« Anticiper, c'est déjà agir. » — Métrodore",
            "« Les concepts innés éclairent notre chemin. » — Épicure",
            "« La sagesse commence par l'intuition juste. » — Épicure"
        ],
        gameplay: "Anticipe les attaques adverses, augmentant les chances de parade au tour suivant."
    },
    {
        id: "kyriologoumena",
        label: "Kyriologoumena (Maximes Capitales)",
        level: 3,
        baseDmg: 35,
        shield: 20,
        precision: 0.75,
        focus: 20,
        quotes: [
            "« Les maximes principales sont les fondements de la sagesse épicurienne. » — Épicure",
            "« Les quarantes maximes sont des phares dans la nuit. » — Métrodore",
            "« La sagesse se résume en quelques principes clés. » — Épicure",
            "« Les maximes sont des outils pour une vie heureuse. » — Épicure",
            "« Connais les maximes, et tu connaîtras la vie. » — Lucrèce"
        ],
        gameplay:
            "Crée un bouclier puissant et inflige des dégâts modérés, tout en augmentant la faveur de l'auditoire."
    }
];
export const NIHILIST_MOVES = [
    // Niveau 1
    {
        id: "absurdite",
        label: "Absurdité Existentielle",
        level: 1,
        baseDmg: 10,
        precision: 0.9,
        focus: 5,
        quotes: [
            "« L'homme est une passion inutile. » — Jean-Paul Sartre",
            "« L’absurde naît de cette confrontation entre l’appel humain et le silence déraisonnable du monde. » — Albert Camus",
            "« Nous sommes tous des condamnés à mort en sursis. » — Emil Cioran",
            "« L’absurdité est la lucidité. » — Albert Camus",
            "« Tout est absurde quand on le regarde de trop près. » — Emil Cioran"
        ],
        gameplay:
            "Inflige des dégâts modérés et réduit légèrement la concentration de l'adversaire, reflétant l'absurdité de l'existence."
    },
    {
        id: "desespoir",
        label: "Désespoir Métaphysique",
        level: 1,
        baseDmg: 12,
        precision: 0.85,
        focus: 7,
        quotes: [
            "« Tout est permis. » — Dostoïevski, Les Frères Karamazov",
            "« Le désespoir est une forme supérieure de la conscience. » — Søren Kierkegaard",
            "« Le désespoir est la certitude de l’absurdité de tout. » — Emil Cioran",
            "« Il n’y a qu’un problème philosophique vraiment sérieux : c’est le suicide. » — Albert Camus",
            "« Le désespoir est la lucidité face à l’absence de sens. » — Emil Cioran"
        ],
        gameplay: "Inflige des dégâts et a une chance de provoquer une légère aporie chez l'adversaire."
    },
    {
        id: "vide",
        label: "Vide Existentiel",
        level: 1,
        baseDmg: 0,
        precision: 1.0,
        focus: -10, // Restaure la concentration
        quotes: [
            "« Le néant est la vérité du monde. » — Martin Heidegger",
            "« Le vide est la seule réponse à l’absurdité de l’existence. » — Emil Cioran",
            "« L’homme est un accident dans l’indifférence de l’univers. » — Albert Camus",
            "« Le silence éternel de ces espaces infinis m’effraie. » — Blaise Pascal",
            "« Le vide est la seule réalité qui ne mente pas. » — Emil Cioran"
        ],
        gameplay: "Restaure la concentration, reflétant l'acceptation du vide."
    },
    {
        id: "indifference",
        label: "Indifférence Cosmique",
        level: 1,
        baseDmg: 8,
        precision: 0.95,
        focus: 4,
        quotes: [
            "« L’univers est indifférent à notre existence. » — Albert Camus",
            "« Nous sommes tous des étrangers dans un monde qui ne nous concerne pas. » — Emil Cioran",
            "« L’indifférence de l’univers est la seule vérité. » — Friedrich Nietzsche",
            "« L’homme est un grain de poussière dans l’immensité froide du cosmos. » — Arthur Schopenhauer",
            "« L’univers ne nous doit rien. » — Albert Camus"
        ],
        gameplay: "Réduit la capacité de l'adversaire à accumuler de la concentration au tour suivant."
    },

    // Niveau 2
    {
        id: "destruction",
        label: "Destruction des Valeurs",
        level: 2,
        baseDmg: 25,
        precision: 0.75,
        focus: 12,
        quotes: [
            "« Dieu est mort. » — Friedrich Nietzsche",
            "« Toutes les valeurs sont des illusions. » — Friedrich Nietzsche",
            "« La destruction est la seule création possible dans un monde sans sens. » — Emil Cioran",
            "« Les valeurs ne sont que des ombres sur le mur de la caverne. » — Inspiré de Platon",
            "« Tout ce qui était solide se dissout dans l’air. » — Karl Marx"
        ],
        gameplay: "Inflige des dégâts élevés et réduit la concentration de l'adversaire."
    },
    {
        id: "nihilisme_passif",
        label: "Nihilisme Passif",
        level: 2,
        baseDmg: 0,
        precision: 1.0,
        focus: 15,
        quotes: [
            "« Rien n’a de sens, alors pourquoi agir ? » — Inspiré de Friedrich Nietzsche",
            "« L’inaction est la seule réponse logique à l’absurdité. » — Emil Cioran",
            "« Le repos est la seule sagesse dans un monde sans but. » — Arthur Schopenhauer",
            "« L’immobilité est la seule liberté dans un univers indifférent. » — Emil Cioran",
            "« Ne rien faire est la seule action qui ait un sens. » — Inspiré de Søren Kierkegaard"
        ],
        gameplay: "Restaure la concentration et réduit l'aporie, reflétant l'acceptation passive du néant."
    },
    {
        id: "nihilisme_actif",
        label: "Nihilisme Actif",
        level: 2,
        baseDmg: 30,
        precision: 0.7,
        focus: 18,
        quotes: [
            "« Si tout est permis, alors détruisons tout. » — Inspiré de Dostoïevski",
            "« La destruction est une forme de création. » — Friedrich Nietzsche",
            "« Brûlons tout, il n’y a rien à sauver. » — Emil Cioran",
            "« La violence est la seule réponse à l’absurdité. » — Inspiré de Friedrich Nietzsche",
            "« La destruction est la seule vérité. » — Emil Cioran"
        ],
        gameplay: "Inflige des dégâts élevés et réduit la capacité de l'adversaire à se soigner."
    },
    {
        id: "chaos",
        label: "Embrasser le Chaos",
        level: 2,
        baseDmg: 20,
        precision: 0.8,
        focus: 10,
        quotes: [
            "« Dans le chaos, il y a une férocité. » — Friedrich Nietzsche",
            "« Le chaos est la seule loi d’un monde sans dieu. » — Emil Cioran",
            "« L’ordre est une illusion, le chaos est la réalité. » — Inspiré de Friedrich Nietzsche",
            "« Le chaos est la seule réponse à l’absurdité de l’existence. » — Albert Camus",
            "« Embrasse le chaos, car c’est tout ce qui reste. » — Emil Cioran"
        ],
        gameplay: "Inflige des dégâts et a une chance de désorienter l'adversaire."
    },

    // Niveau 3
    {
        id: "aneantissement",
        label: "Anéantissement",
        level: 3,
        baseDmg: 70,
        precision: 0.5,
        focus: 30,
        quotes: [
            "« L’anéantissement est la seule vérité. » — Emil Cioran",
            "« Tout doit être détruit pour que rien ne subsiste. » — Friedrich Nietzsche",
            "« L’anéantissement est la seule libération. » — Arthur Schopenhauer",
            "« La fin est le seul commencement possible. » — Emil Cioran",
            "« L’anéantissement est la seule réponse à l’absurdité. » — Albert Camus"
        ],
        gameplay: "Inflige des dégâts massifs et réduit la concentration de l'adversaire de manière significative."
    },
    {
        id: "vanite",
        label: "Vanité de Tout",
        level: 3,
        baseDmg: 0,
        precision: 1.0,
        focus: 25,
        quotes: [
            "« Vanité des vanités, tout est vanité. » — Ecclésiaste",
            "« Tout est vain, et la poursuite du vent. » — Ecclésiaste",
            "« La vanité est la seule vérité dans un monde sans sens. » — Emil Cioran",
            "« Tout ce que nous faisons est inutile, mais c’est précisément ce qui nous définit. » — Albert Camus",
            "« La vanité est le seul absolu. » — Emil Cioran"
        ],
        gameplay:
            "Restaure toute la concentration et annule l'aporie, reflétant l'acceptation totale de la vanité de toute chose."
    },
    {
        id: "destin",
        label: "Destin Inéluctable",
        level: 3,
        baseDmg: 60,
        precision: 0.55,
        focus: 28,
        quotes: [
            "« Le destin est une fatalité à laquelle on ne peut échapper. » — Inspiré de Friedrich Nietzsche",
            "« Le destin est une farce jouée par un dieu inexistant. » — Emil Cioran",
            "« Nous sommes tous des marionnettes d’un destin qui n’existe pas. » — Albert Camus",
            "« Le destin est une illusion, mais nous n’avons pas le choix de le suivre. » — Søren Kierkegaard",
            "« Le destin est une prison sans murs. » — Emil Cioran"
        ],
        gameplay: "Inflige des dégâts élevés et a une chance de provoquer une aporie prolongée chez l'adversaire."
    },
    {
        id: "neant",
        label: "Retour au Néant",
        level: 3,
        baseDmg: 50,
        precision: 0.6,
        focus: 22,
        quotes: [
            "« Le néant est la seule réalité. » — Emil Cioran",
            "« Tout retourne au néant, d’où tout est venu. » — Arthur Schopenhauer",
            "« Le néant est la seule vérité qui ne mente pas. » — Emil Cioran",
            "« Le néant est notre origine et notre fin. » — Friedrich Nietzsche",
            "« Le néant est la seule réponse à l’absurdité de l’existence. » — Albert Camus"
        ],
        gameplay:
            "Inflige des dégâts élevés et réduit la capacité de l'adversaire à utiliser des mouvements coûteux en concentration."
    }
];

// Doctrines
export const DOCTRINES = {
    stoic: {
        id: "stoic",
        color: "#2a9d8f",
        icon: "🛡️",
        name: "Stoïcien",
        logMessage: (move, dmg) => `✓ ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]}`,
        opponentLogMessage: (name, move, dmg) =>
            `⚔️ ${name} utilise ${move.label} ! ${move.quotes[Math.floor(Math.random() * move.quotes.length)]}`,
        healLogMessage: (move, heal) =>
            `💖 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (+${heal} vitalité)`,
        verbatimPrefix: "Stoïcien : ",
        victoryMessages: [
            "🏛️ **VICTOIRE STOÏCIENNE** : *La vertu triomphe des passions. Le Logos a guidé chaque pas vers la sagesse.* 🏛️",
            "🏛️ **TRIOMPHE DU LOGOS** : *L'obstacle était le chemin. La raison a prévalu sur le chaos.* 🏛️",
            "🏛️ **CITADELLE INVIOLÉE** : *Aucune attaque externe ne peut ébranler la forteresse intérieure.* 🏛️",
            "🏛️ **VICTOIRE PAR L'ATARAXIE** : *Le calme de l'âme a dissipé la tempête des passions.* 🏛️",
            "🏛️ **AMOR FATI** : *Aimer son destin, même dans la victoire, c'est la vraie sagesse.* 🏛️"
        ],
        defeatMessages: [
            "🌪️ **DÉFAITE STOÏCIENNE** : *Les événements ne dépendent pas de nous, mais notre réponse reste libre.* 🌪️",
            "🌪️ **ÉPREUVE DU SAGE** : *La défaite est un exercice de résilience. La vertu persiste.* 🌪️",
            "🌪️ **LEÇON DU DESTIN** : *Ce qui arrive arrive comme il doit arriver. La sagesse consiste à l'accepter.* 🌪️",
            "🌪️ **CITADELLE INTÉRIEURE** : *Les murs extérieurs peuvent tomber, mais l'âme reste invaincue.* 🌪️",
            "🌪️ **INDIFFÉRENCE AUX RÉSULTATS** : *La défaite est un événement extérieur, sans pouvoir sur notre jugement.* 🌪️"
        ],
        moves: STOIC_MOVES,
        healthLabel: "Vitalité",
        focusLabel: "Concentration"
    },
    epicurean: {
        id: "epicurean",
        color: "#457b9d",
        icon: "🌿",
        name: "Épicurien",
        logMessage: (move, dmg) =>
            `🌿 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (${dmg}).`,
        opponentLogMessage: (name, move, dmg) =>
            `⚔️ ${name} utilise ${move.label} ! ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (Dégâts: ${dmg})`,
        healLogMessage: (move, heal) =>
            `💖 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (+${heal} vitalité)`,
        verbatimPrefix: "Épicurien : ",
        victoryMessages: [
            "🌿 **VICTOIRE ÉPICURIENNE** : *L'Ataraxie règne. Le plaisir simple et la raison ont vaincu.* 🌿",
            "🌿 **TRIOMPHE DU JARDIN** : *Dans le calme de l'âme, même la victoire est un plaisir modéré.* 🌿",
            "🌿 **HARMONIE TROUVÉE** : *Le bonheur est une vie sans trouble, comme un jardin bien cultivé.* 🌿",
            "🌿 **PLAISIRS SIMPLES** : *La victoire est douce, mais l'amitié et la tranquillité sont plus douces encore.* 🌿",
            "🌿 **SAGESSE ÉPICURIENNE** : *Le vrai bonheur ne dépend pas des circonstances, mais de notre attitude.* 🌿"
        ],
        defeatMessages: [
            "🌑 **DÉFAITE ÉPICURIENNE** : *Le Jardin est perturbé, mais le plaisir reste un guide éternel.* 🌑",
            "🌑 **TROUBLE PASSAGER** : *La douleur est un signal, non une fin. L'ataraxie reviendra.* 🌑",
            "🌑 **LEÇON D'HUMILITÉ** : *Même dans la défaite, le plaisir de vivre persiste.* 🌑",
            "🌑 **ÉQUILIBRE RETROUVÉ** : *La défaite est un déséquilibre passager. La sagesse reste.* 🌑",
            "🌑 **PLAISIRS FUTURS** : *Cette défaite n'est qu'un épisode. Le bonheur est une pratique quotidienne.* 🌑"
        ],
        moves: EPICUR_MOVES,
        healthLabel: "Équilibre",
        focusLabel: "Plaisir"
    },
    buddhist: {
        id: "buddhist",
        color: "#ffb703",
        icon: "☸️",
        name: "Bouddhiste",
        logMessage: (move, dmg) =>
            `☸️ ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (${dmg}).`,
        opponentLogMessage: (name, move, dmg) =>
            `⚔️ ${name} utilise ${move.label} ! ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (Dégâts: ${dmg})`,
        healLogMessage: (move, heal) =>
            `💖 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (+${heal} vitalité)`,
        verbatimPrefix: "Bouddhiste : ",
        victoryMessages: [
            "☸️ **ÉVEIL BOUDDHISTE** : *La souffrance est transcendée. Le Nirvana est atteint.* ☸️",
            "☸️ **CESSATION DE LA SOUFFRANCE** : *Les chaînes du Samsara sont brisées.* ☸️",
            "☸️ **HARMONIE RETROUVÉE** : *La compassion a triomphé de l'ignorance.* ☸️",
            "☸️ **VACUITÉ RÉALISÉE** : *Toutes les illusions se sont dissipées comme la rosée au soleil.* ☸️",
            "☸️ **VOIE DU MILIEU** : *Ni victoire ni défaite, seulement la cessation du conflit.* ☸️"
        ],
        defeatMessages: [
            "🌪️ **DÉFAITE BOUDDHISTE** : *La roue du Samsara tourne encore, mais la compassion reste.* 🌪️",
            "🌪️ **LEÇON DE DUKKHA** : *La souffrance est un rappel du chemin qui reste à parcourir.* 🌪️",
            "🌪️ **ATTACHEMENT BRISÉ** : *La défaite est une illusion, comme le 'moi' lui-même.* 🌪️",
            "🌪️ **IMPERMANENCE** : *Ce revers est passager, comme tout dans ce monde.* 🌪️",
            "🌪️ **COMPASSION RENOUVELÉE** : *Même dans l'échec, la bienveillance envers tous les êtres persiste.* 🌪️"
        ],
        moves: BUDDHIST_MOVES,
        healthLabel: "Équanimité",
        focusLabel: "Méditation"
    },
    cynic: {
        id: "cynic",
        color: "#8B0000",
        icon: "🐕",
        name: "Cynique",
        logMessage: (move, dmg) =>
            `🐕 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (${dmg}).`,
        opponentLogMessage: (name, move, dmg) =>
            `⚔️ ${name} utilise ${move.label} ! ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (Dégâts: ${dmg})`,
        healLogMessage: (move, heal) =>
            `💖 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (+${heal} vitalité)`,
        verbatimPrefix: "Cynique : ",
        victoryMessages: [
            "🐕 **TRIOMPHE CYNIQUE** : *La liberté a écrasé les conventions. Diogène aurait ri.* 🐕",
            "🐕 **VICTOIRE DU TONNEAU** : *La simplicité a vaincu l'hypocrisie des palais.* 🐕",
            "🐕 **LIBERTÉ ABSOLUE** : *Aucune chaîne sociale ne peut retenir un esprit libre.* 🐕",
            "🐕 **PROVOCATION RÉUSSIE** : *Les masques sont tombés, la vérité a triomphé.* 🐕",
            "🐕 **MÉPRIS DES HONNEURS** : *La victoire est une farce, mais c'est la seule qui vaille la peine.* 🐕"
        ],
        defeatMessages: [
            "🏛️ **DÉFAITE CYNIQUE** : *Le monde reste soumis aux conventions. Tant pis : la liberté est ailleurs.* 🏛️",
            "🏛️ **ÉCHEC PROVISOIRE** : *Les chiens aboient, la caravane passe. La liberté persiste.* 🏛️",
            "🏛️ **LEÇON D'INDÉPENDANCE** : *Même vaincu, le cynique reste libre dans son esprit.* 🏛️",
            "🏛️ **MÉPRIS DES RÉSULTATS** : *La défaite est une preuve de plus que tout est absurde.* 🏛️",
            "🏛️ **TONNEAU INTACT** : *Les murs peuvent tomber, mais la liberté intérieure reste.* 🏛️"
        ],
        moves: CYNIC_MOVES,
        healthLabel: "Audace",
        focusLabel: "Provocation"
    },
    nihilist: {
        id: "nihilist",
        color: "#800020",
        icon: "💀",
        name: "Nihiliste",
        logMessage: (move, dmg) =>
            `💀 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (${dmg}).`,
        opponentLogMessage: (name, move, dmg) =>
            `⚔️ ${name} utilise ${move.label} ! ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (Dégâts: ${dmg})`,
        healLogMessage: (move, heal) =>
            `💖 ${move.label} : ${move.quotes[Math.floor(Math.random() * move.quotes.length)]} (+${heal} vitalité)`,
        verbatimPrefix: "Nihiliste : ",
        victoryMessages: [
            "💀 **TRIOMPHE DU NÉANT** : *Comme le disait Cioran : 'La victoire est une illusion, mais c'est la seule qui nous reste.'* 💀",
            "💀 **VICTOIRE ABSURDE** : *Tout est vain, mais la victoire l'est double. L'absurdité a triomphé.* 💀",
            "💀 **NÉANT VICTORIEUX** : *La victoire est un écho dans le vide. Elle ne change rien, mais c'est amusant.* 💀",
            "💀 **TRIOMPHE SANS GLOIRE** : *Comme le disait Nietzsche : 'Tout est permis.' Aujourd'hui, la victoire l'était aussi.* 💀",
            "💀 **VICTOIRE IRONIQUE** : *Le nihiliste a gagné, mais il sait que cela ne change rien. L'absurdité persiste.* 💀"
        ],
        defeatMessages: [
            "💀 **DÉFAITE LOGIQUE** : *Comme le disait Cioran : 'La défaite est une conclusion logique.' Tout finit dans l'oubli.* 💀",
            "💀 **ÉCHEC SANS IMPORTANCE** : *La défaite confirme ce que nous savions déjà : rien n'a de sens.* 💀",
            "💀 **RETOUR AU NÉANT** : *La défaite est une blague cosmique. Le néant rit toujours.* 💀",
            "💀 **LEÇON D'ABSURDITÉ** : *La défaite est la seule vérité dans un monde sans sens.* 💀",
            "💀 **DÉFAITE LIBÉRATRICE** : *Enfin quelque chose d'intéressant... Le néant est la seule réalité.* 💀"
        ],
        moves: NIHILIST_MOVES,
        healthLabel: "Néant",
        focusLabel: "Causalité"
    }
};
