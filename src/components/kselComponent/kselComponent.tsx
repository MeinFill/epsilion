import { useState } from "react";
import "./kselComponent.css"

function KselComponent() {
    const [tochkaNow, setTochkaNow] = useState(0);
    const [tochkaNeed, setTochkaNeed] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [chance, setChance] = useState<string>(' пока ничего')

    const calculationKsel = () => {
        if (tochkaNow >= tochkaNeed) {
            setChance("Вы уже достигли результата");
        }
        else {
            const valueList = new Array(tochkaNeed-tochkaNow).fill(1);;
            for (var i = 0; i != attempts; i++){
                for (const strIndex in valueList) {
                    const index = parseInt(strIndex);
                    if (index == tochkaNeed-tochkaNow-1){
                        valueList[index] = ((tochkaNow + index) / 10) * valueList[index];
                    }
                    else {
                        valueList[index] = ((tochkaNow + index) / 10) * valueList[index] + (1 - (tochkaNow + index) / 10) * valueList[index + 1]
                    }
                };
            }
            const totalChance = ((1 - valueList[0]) * 100).toFixed(3);
            setChance(totalChance + "%");
        }
    }

    const calculationBez = () => {
        if (tochkaNow >= tochkaNeed) {
            setChance("Вы уже достигли результата");
        }
        else {
            var chanceForFirst = 0;
            var realAttempt = attempts;
            var realNockaNow = tochkaNow
            if (tochkaNow > 1){
                chanceForFirst += 1;
                for(var i = tochkaNow; i != tochkaNeed && (tochkaNeed - tochkaNow) <= attempts; i++){
                    chanceForFirst *= 1 - (i / 10);
                }
                realAttempt = attempts - (tochkaNeed - tochkaNow);
                realNockaNow = 0;
            }
            var chance = 0;
            const valueList = new Array(tochkaNeed-realNockaNow).fill(0);
            for (var i = 0; i != realAttempt; i++){
                for (const strIndex in valueList) {
                    const index = parseInt(strIndex);
                    if (index == tochkaNeed-realNockaNow-1){
                        valueList[index] = (1 - (tochkaNeed - 1) / 10) + ((realNockaNow + index) / 10) * chance;
                        chance = valueList[0];
                    }
                    else {
                        valueList[index] = (1 - (realNockaNow + index) / 10) * valueList[index + 1] + ((realNockaNow + index) / 10) * chance;
                    }
                };
            }
            const totalChance = ((chance + chanceForFirst) * 100).toFixed(3);
            setChance(totalChance + "%");
        }
    }

    return(
        <div className="main-class">
            <div className="tabletosik">
                <button 
                  className={activeTab === 0 ? 'active' : ''} 
                  onClick={() => {
                    setChance(' пока ничего');
                    setActiveTab(0);
                    setTochkaNow(0);
                    setTochkaNeed(0);
                    setAttempts(0);
                  }}
                >
                    Рассчет кселами
                </button>
                <button 
                  className={activeTab === 1 ? 'active' : ''} 
                  onClick={() => {
                    setChance(' пока ничего');
                    setActiveTab(1);
                    setTochkaNow(0);
                    setTochkaNeed(0);
                    setAttempts(0);
                  }}
                >
                    Рассчет безопасками
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 0 && 
                    <div className="main-class-ksel">
                        <div className="ksel-item">
                            <p>Какая точка сейчас: </p>
                            <input 
                                type="number"
                                min="0"
                                max="9"
                                step="1"
                                className="quantity"
                                onChange={(e) => setTochkaNow(parseInt(e.target.value))}
                                onInput={(e) => {
                                if (e.currentTarget.value.length > 1) {
                                  e.currentTarget.value = e.currentTarget.value.slice(0, 1);
                                }
                                }}
                            />
                        </div>
                        <div className="ksel-item">
                            <p>Какая точка нужна: </p>
                            <input 
                                type="number"
                                min="0"
                                max="10"
                                step="1"
                                className="quantity"
                                onChange={(e) => setTochkaNeed(parseInt(e.target.value))}
                                onInput={(e) => {
                                    let value = e.currentTarget.value;

                                    // Ограничение длины
                                    if (value.length > 2) {
                                        e.currentTarget.value = value.slice(0, 2);
                                        return;
                                    }

                                    // Ограничение диапазона 0-10
                                    const numValue = parseInt(value);
                                    if (numValue > 10) {
                                        e.currentTarget.value = '10';
                                    }
                                }}
                            />
                        </div>
                        <div className="ksel-item">   
                            <p>Сколько кселов готов потратить: </p>
                            <input maxLength={7} onChange={(e) => setAttempts(parseInt(e.target.value))}></input>
                        </div>
                        <button onClick={calculationKsel} className="calculate-btn">Рассчитать</button>
                        <div className="ksel-item">
                            <p>Шансы на успех: {chance}</p>
                        </div>
                    </div>
                }
                {activeTab === 1 && 
                    <div className="main-class-ksel">
                        <div className="ksel-item">
                            <p>Какая точка сейчас: </p>
                            <input 
                                type="number"
                                min="0"
                                max="9"
                                step="1"
                                className="quantity"
                                onChange={(e) => setTochkaNow(parseInt(e.target.value))}
                                onInput={(e) => {
                                if (e.currentTarget.value.length > 1) {
                                  e.currentTarget.value = e.currentTarget.value.slice(0, 1);
                                }
                                }}
                            />
                        </div>
                        <div className="ksel-item">
                            <p>Какая точка нужна: </p>
                            <input 
                                type="number"
                                min="0"
                                max="9"
                                step="1"
                                className="quantity"
                                onChange={(e) => setTochkaNeed(parseInt(e.target.value))}
                                onInput={(e) => {
                                    let value = e.currentTarget.value;

                                    // Ограничение длины
                                    if (value.length > 2) {
                                        e.currentTarget.value = value.slice(0, 2);
                                        return;
                                    }

                                    // Ограничение диапазона 0-10
                                    const numValue = parseInt(value);
                                    if (numValue > 10) {
                                        e.currentTarget.value = '10';
                                    }
                                }}
                            />
                        </div>
                        <div className="ksel-item">   
                            <p>Сколько безопасок готов потратить: </p>
                            <input maxLength={7} onChange={(e) => setAttempts(parseInt(e.target.value))}></input>
                        </div>
                        <button onClick={calculationBez} className="calculate-btn">Рассчитать</button>
                        <div className="ksel-item">
                            <p>Шансы на успех: {chance}</p>
                        </div>
                        <div className="ksel-item">
                            <p>*Пустые значения засчитаются за 0</p>
                        </div>
                        <div className="ksel-item">
                            <p>В будущем будет кнопка "Сделаю +1 опасками"</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default KselComponent