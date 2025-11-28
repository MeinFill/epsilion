import { useState } from "react";
import "./kselComponent.css"

function KselComponent() {
    const [chance, setChance] = useState<string>(' пока ничего')

    const calculation = () => {
        setChance('100');
    }

    return(
        <div className="main-class-ksel">
            <div className="ksel-item">
                <p>Какая точка сейчас: </p>
                <input></input>
            </div>
            <div className="ksel-item">
                <p>Какая точка нужна: </p>
                <input></input>
            </div>
            <div className="ksel-item">   
                <p>Сколько кселов: </p>
                <input></input>
            </div>
            <button onClick={calculation}>Рассчитать</button>
            <div className="ksel-item">
                <p>Вероятность успеха: {chance}</p>
            </div>
        </div>
    )
}

export default KselComponent