import { FlapDisplay, Presets } from 'react-split-flap-effect'

function CountDown(props) {

    const endDay = new Date('March 10, 2021');
    const remainingDays = Math.floor((endDay - Date.now()) / (1000*3600*24));
    const text = props.pre + remainingDays + props.post;
        
    return(
        <div>
            <FlapDisplay
                className = "L"
                chars={Presets.ALPHANUM + ',!'}
                // length={`${text.length}`}
                value={`${text}`}
            />
        </div>
    );
}

export default CountDown;