/*

type.js

pokémon type matchup helper

*/

exports.run = (bot, message) => {

    class TypeCombo {
        constructor(pType, sType) {

            this.pType = pType; // primary type
            this.sType = sType; // secondary type

            if (pType.typing == sType.typing) {
                this.defend = {
                    "normal": pType.defending["normal"],
                    "fighting": pType.defending["fighting"],
                    "flying": pType.defending["flying"],
                    "poison": pType.defending["poison"],
                    "ground": pType.defending["ground"],
                    "rock": pType.defending["rock"],
                    "bug": pType.defending["bug"],
                    "ghost": pType.defending["ghost"],
                    "steel": pType.defending["steel"],
                    "fire": pType.defending["fire"],
                    "water": pType.defending["water"],
                    "grass": pType.defending["grass"],
                    "electric": pType.defending["electric"],
                    "psychic": pType.defending["psychic"],
                    "ice": pType.defending["ice"],
                    "dragon": pType.defending["dragon"],
                    "dark": pType.defending["dark"],
                    "fairy": pType.defending["fairy"]
                };
            }
            else {
                this.defend = {
                    "normal": pType.defending["normal"] * sType.defending["normal"],
                    "fighting": pType.defending["fighting"] * sType.defending["fighting"],
                    "flying": pType.defending["flying"] * sType.defending["flying"],
                    "poison": pType.defending["poison"] * sType.defending["poison"],
                    "ground": pType.defending["ground"] * sType.defending["ground"],
                    "rock": pType.defending["rock"] * sType.defending["rock"],
                    "bug": pType.defending["bug"] * sType.defending["bug"],
                    "ghost": pType.defending["ghost"] * sType.defending["ghost"],
                    "steel": pType.defending["steel"] * sType.defending["steel"],
                    "fire": pType.defending["fire"] * sType.defending["fire"],
                    "water": pType.defending["water"] * sType.defending["water"],
                    "grass": pType.defending["grass"] * sType.defending["grass"],
                    "electric": pType.defending["electric"] * sType.defending["electric"],
                    "psychic": pType.defending["psychic"] * sType.defending["psychic"],
                    "ice": pType.defending["ice"] * sType.defending["ice"],
                    "dragon": pType.defending["dragon"] * sType.defending["dragon"],
                    "dark": pType.defending["dark"] * sType.defending["dark"],
                    "fairy": pType.defending["fairy"] * sType.defending["fairy"]
                };
            };

            this.veryWeak = [];
            this.weak = [];
            this.resistant = [];
            this.veryResistant = [];
            this.immune = [];

            for (let type in this.defend) {
                if (this.defend[type] == 4) this.veryWeak.push(type);
                if (this.defend[type] == 2) this.weak.push(type);
                if (this.defend[type] == 0.5) this.resistant.push(type);
                if (this.defend[type] == 0.25) this.veryResistant.push(type);
                if (this.defend[type] == 0) this.immune.push(type);
            };
        };

        get report() {
            let rType = this.pType.typing;

            let rVeryWeak = "";
            let rWeak = "";
            let rResistant = "";
            let rVeryResistant = "";
            let rImmune = "";

            if (this.sType) {
                if (this.sType.typing != "???") {
                    if (rType == "???") rType = `**${this.sType.typing}**`
                    else if (rType != this.sType.typing) rType = `${rType} / ${this.sType.typing}`;
                }
                else if (rType == "???") return "This isn't a valid type combination!";
            }
            else {
                if (rType == "???") return "This isn't a valid type combination!";
            };

            if (this.veryWeak.length > 0) {
                let i = 0, len = this.veryWeak.length;
                while (i < len) {
                    if (i == len - 1) rVeryWeak = `\nVery weak to: ${rVeryWeak}**${this.veryWeak[i]}**`;
                    else rVeryWeak = `${rVeryWeak}**${this.veryWeak[i]}**, `;

                    ++i;
                };
            };
            if (this.weak.length > 0) {
                let i = 0, len = this.weak.length;
                while (i < len) {
                    if (i == len - 1) rWeak = `\nWeak to: ${rWeak}**${this.weak[i]}**`;
                    else rWeak = `${rWeak}**${this.weak[i]}**, `;

                    ++i;
                };
            };
            if (this.resistant.length > 0) {
                let i = 0, len = this.resistant.length;
                while (i < len) {
                    if (i == len - 1) rResistant = `\nResistant to: ${rResistant}**${this.resistant[i]}**`;
                    else rResistant = `${rResistant}**${this.resistant[i]}**, `;

                    ++i;
                };
            };
            if (this.veryResistant.length > 0) {
                let i = 0, len = this.veryResistant.length;
                while (i < len) {
                    if (i == len - 1) rVeryResistant = `\nVery resistant to: ${rVeryResistant}**${this.veryResistant[i]}**`;
                    else rVeryResistant = `${rVeryResistant}**${this.veryResistant[i]}**, `;

                    ++i;
                };
            };
            if (this.immune.length > 0) {
                let i = 0, len = this.immune.length;
                while (i < len) {
                    if (i == len - 1) rImmune = `\nImmune to: ${rImmune}**${this.immune[i]}**`;
                    else rImmune = `${rImmune}**${this.immune[i]}**, `;

                    ++i;
                };
            };

            let attackData = "";
            if (this.pType.typing == this.sType.typing) attackData = `${this.pType.se}${this.pType.nv}${this.pType.ne}`;
            else attackData = `${this.pType.se}${this.pType.nv}${this.pType.ne}${this.sType.se}${this.sType.nv}${this.sType.ne}`;

            let report =
`Type: **${rType}**
            
__Defending__${rVeryWeak}${rWeak}${rResistant}${rVeryResistant}${rImmune}

__Attacking__${attackData}`;

            return report.trim();
        };
    };

    class IndividualType {
        constructor(t) {

            this.type = t;

            this.defend = {
                "normal": 1,
                "fighting": 1,
                "flying": 1,
                "poison": 1,
                "ground": 1,
                "rock": 1,
                "bug": 1,
                "ghost": 1,
                "steel": 1,
                "fire": 1,
                "water": 1,
                "grass": 1,
                "electric": 1,
                "psychic": 1,
                "ice": 1,
                "dragon": 1,
                "dark": 1,
                "fairy": 1
            };

            this.attack = {
                "normal": 1,
                "fighting": 1,
                "flying": 1,
                "poison": 1,
                "ground": 1,
                "rock": 1,
                "bug": 1,
                "ghost": 1,
                "steel": 1,
                "fire": 1,
                "water": 1,
                "grass": 1,
                "electric": 1,
                "psychic": 1,
                "ice": 1,
                "dragon": 1,
                "dark": 1,
                "fairy": 1
            };

            switch (t) {
                case "normal": {
                    // weak
                    for (let type of ["fighting"]) this.defend[type] *= 2;
                    // resistant
                    // immune
                    for (let type of ["ghost"]) this.defend[type] *= 0;

                    // super effective
                    // not very effective
                    // not effective
                    for (let type of ["ghost"]) this.attack[type] *= 0;
					break;
                };
                case "fighting": {
                    // weak
                    for (let type of ["flying", "psychic", "fairy"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["rock", "bug", "dark"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["normal", "rock", "steel", "ice", "dark"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["flying", "poison", "bug", "psychic", "fairy"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["ghost"]) this.attack[type] *= 0;
					break;
                };
                case "flying": {
                    // weak
                    for (let type of ["rock", "electric", "ice"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fighting", "bug", "grass"]) this.defend[type] *= 0.5;
                    // immune
                    for (let type of ["ground"]) this.defend[type] *= 0;

                    // super effective
                    for (let type of ["fighting", "bug", "grass"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["rock", "steel", "electric"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "poison": {
                    // weak
                    for (let type of ["ground", "psychic"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fighting", "poison", "bug", "grass", "fairy"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["grass", "fairy"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["poison", "ground", "rock", "ghost"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["steel"]) this.attack[type] *= 0;
					break;
                };
                case "ground": {
                    // weak
                    for (let type of ["water", "grass", "ice"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["poison", "rock"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["poison", "rock", "steel", "fire", "electric"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["bug", "grass"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["flying"]) this.attack[type] *= 0;
					break;
                };
                case "rock": {
                    // weak
                    for (let type of ["fighting", "ground", "steel", "water", "grass"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["normal", "flying", "poison", "fire"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["flying", "bug", "fire", "ice"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["fighting", "ground", "steel"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "bug": {
                    // weak
                    for (let type of ["flying", "rock", "fire"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fighting", "ground", "grass"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["grass", "psychic", "dark"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "ghost": {
                    // weak
                    for (let type of ["ghost", "dark"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["poison", "bug"]) this.defend[type] *= 0.5;
                    // immune
                    for (let type of ["normal", "fighting"]) this.defend[type] *= 0;

                    // super effective
                    for (let type of ["ghost", "psychic"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["dark"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["normal"]) this.attack[type] *= 0;
					break;
                };
                case "steel": {
                    // weak
                    for (let type of ["fighting", "ground", "fire"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"]) this.defend[type] *= 0.5;
                    // immune
                    for (let type of ["poison"]) this.defend[type] *= 0;

                    // super effective
                    for (let type of ["rock", "ice", "fairy"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["steel", "fire", "water", "electric"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "fire": {
                    // weak
                    for (let type of ["ground", "rock", "water"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["bug", "steel", "fire", "grass", "ice", "fairy"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["bug", "steel", "grass", "ice"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["rock", "fire", "water", "dragon"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "water": {
                    // weak
                    for (let type of ["grass", "electric"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["steel", "fire", "water", "ice"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["ground", "rock", "fire"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["water", "grass", "dragon"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "grass": {
                    // weak
                    for (let type of ["flying", "poison", "bug", "fire", "ice"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["ground", "water", "grass", "electric"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["ground", "rock", "water"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "electric": {
                    // weak
                    for (let type of ["ground"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["flying", "steel", "electric"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["flying", "water"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["grass", "electric", "dragon"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["ground"]) this.attack[type] *= 0;
					break;
                };
                case "psychic": {
                    // weak
                    for (let type of ["bug", "ghost", "dark"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fighting", "psychic"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["fighting", "poison"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["steel", "psychic"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["dark"]) this.attack[type] *= 0;
					break;
                };
                case "ice": {
                    // weak
                    for (let type of ["fighting", "rock", "steel", "fire"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["ice"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["flying", "ground", "grass", "dragon"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["steel", "fire", "water", "ice"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "dragon": {
                    // weak
                    for (let type of ["ice", "dragon", "fairy"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fire", "water", "grass", "electric"]) this.defend[type] *= 0.5;
                    // immune

                    // super effective
                    for (let type of ["dragon"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["steel"]) this.attack[type] *= 0.5;
                    // not effective
                    for (let type of ["fairy"]) this.attack[type] *= 0;
					break;
                };
                case "dark": {
                    // weak
                    for (let type of ["fighting", "bug", "fairy"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["ghost", "dark"]) this.defend[type] *= 0.5;
                    // immune
                    for (let type of ["psychic"]) this.defend[type] *= 0;

                    // super effective
                    for (let type of ["ghost", "psychic"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["fighting", "dark", "fairy"]) this.attack[type] *= 0.5;
                    // not effective
					break;
                };
                case "fairy": {
                    // weak
                    for (let type of ["poison", "steel"]) this.defend[type] *= 2;
                    // resistant
                    for (let type of ["fighting", "bug", "dark"]) this.defend[type] *= 0.5;
                    // immune
                    for (let type of ["dragon"]) this.defend[type] *= 0;

                    // super effective
                    for (let type of ["fighting", "dragon", "dark"]) this.attack[type] *= 2;
                    // not very effective
                    for (let type of ["poison", "steel", "fire"]) this.attack[type] *= 0.5;
                    // not effective
                    break;
                };
                default:
                    this.type = "???";
            };

            this.superEffective = [];
            this.notVeryEffective = [];
            this.notEffective = [];

            for (let type in this.attack) {
                if (this.attack[type] == 2) this.superEffective.push(type);
                if (this.attack[type] == 0.5) this.notVeryEffective.push(type);
                if (this.attack[type] == 0) this.notEffective.push(type);
            };

        };

        get typing() {
            return this.type;
        };

        get defending() {
            return this.defend;
        };

        get se() {
            let rSuperEffective = "";
            if (this.superEffective.length > 0) {
                let i = 0, len = this.superEffective.length;
                while (i < len) {
                    if (i == len - 1) rSuperEffective = `\n(**${this.type}**) Super effective against: ${rSuperEffective}**${this.superEffective[i]}**`;
                    else rSuperEffective = `${rSuperEffective}**${this.superEffective[i]}**, `;

                    ++i;
                };
            };
            return rSuperEffective;
        };

        get nv() {
            let rNotVery = "";
            if (this.notVeryEffective.length > 0) {
                let i = 0, len = this.notVeryEffective.length;
                while (i < len) {
                    if (i == len - 1) rNotVery = `\n(**${this.type}**) Not very effective against: ${rNotVery}**${this.notVeryEffective[i]}**`;
                    else rNotVery = `${rNotVery}**${this.notVeryEffective[i]}**, `;

                    ++i;
                };
            };
            return rNotVery;
        };

        get ne() {
            let rNoEffect = "";
            if (this.notEffective.length > 0) {
                let i = 0, len = this.notEffective.length;
                while (i < len) {
                    if (i == len - 1) rNoEffect = `\n(**${this.type}**) No effect against: ${rNoEffect}**${this.notEffective[i]}**`;
                    else rNotVery = `${rNoEffect}**${this.notEffective[i]}**, `;

                    ++i;
                };
            };
            return rNoEffect;
        };
    };

    let typePrimary = new IndividualType(message.args[0]);
    let typeSecondary = new IndividualType(message.args[1]);

    let pkmn = new TypeCombo(typePrimary, typeSecondary);

    message.channel.send(pkmn.report);

};