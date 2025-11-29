import { useState } from "react";
import type { ChangeEvent } from 'react';
import "./kselComponent.css"

function KselComponent() {
    const [tochkaNow, setTochkaNow] = useState(0);
    const [tochkaNeed, setTochkaNeed] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [inputNeed, setInputNeed] = useState('');
    const [inputNow, setInputNow] = useState('');
    const [inputAttempts, setInputAttempts] = useState('');
    const [chance, setChance] = useState<string>(' пока ничего');

    const changeInputNow = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setInputNow('');
            setTochkaNow(0);
            return;
        }
        const lastChar = value[value.length - 1];
        const charCode = lastChar.charCodeAt(0);
        const isDigit = charCode >= 48 && charCode <= 57;

        if (isDigit) {
            setInputNow(lastChar);
            setTochkaNow(parseInt(lastChar));
        }
    }
    
    const changeInputNeed = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setInputNeed('');
            setTochkaNeed(0);
            return;
        }
        const lastChar = value[value.length - 1];
        const charCode = lastChar.charCodeAt(0);
        const isDigit = charCode >= 48 && charCode <= 57;

        if (isDigit) {
            setInputNeed(lastChar);
            setTochkaNeed(parseInt(lastChar));
        }
    }

    const changeInputAttempts = (e: ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value;

        if (value === '') {
            setInputAttempts('');
            setAttempts(0);
            return;
        }
        const lastChar = value[value.length - 1];
        const charCode = lastChar.charCodeAt(0);
        const isDigit = charCode >= 48 && charCode <= 57;

        if (isDigit) {
            if (value[0] == '0'){
                value = value.substring(1);
            }
            setInputAttempts(value);
            setAttempts(parseInt(value));
        } else {
            setInputAttempts(inputAttempts);
        }
    }

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
            const totalChance = (((1 - (1 - chance) * (1 - chanceForFirst))) * 100).toFixed(3);
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
                    setInputNeed('');
                    setInputNow('');
                    setInputAttempts('');
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
                    setInputNeed('');
                    setInputNow('');
                    setInputAttempts('');
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
                                className="quantity"
                                value={inputNow}
                                onChange={changeInputNow}
                            />
                        </div>
                        <div className="ksel-item">
                            <p>Какая точка нужна: </p>
                            <input
                                className="quantity"
                                value={inputNeed}
                                onChange={changeInputNeed}
                            />
                        </div>
                        <div className="ksel-item">   
                            <p>Сколько кселов готов потратить: </p>
                            <input value={inputAttempts} maxLength={7} onChange={changeInputAttempts}></input>
                        </div>
                        <button onClick={calculationKsel} className="calculate-btn">Рассчитать</button>
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
                {activeTab === 1 && 
                    <div className="main-class-ksel">
                        <div className="ksel-item">
                            <p>Какая точка сейчас: </p>
                            <input
                                className="quantity"
                                value={inputNow}
                                onChange={changeInputNow}
                            />
                        </div>
                        <div className="ksel-item">
                            <p>Какая точка нужна: </p>
                            <input
                                className="quantity"
                                value={inputNeed}
                                onChange={changeInputNeed}
                            />
                        </div>
                        <div className="ksel-item">   
                            <p>Сколько безопасок готов потратить: </p>
                            <input value={inputAttempts} maxLength={7} onChange={changeInputAttempts}></input>
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