import capitalize from '../../util/capitalize'
import './RadioLanguage.css'

const RadioLanguage = ({ lang, flagIcon, defaultChecked, onLanguage }) => {
    
    const onChange = e => {
        if (e.target.checked) {
            onLanguage(lang)
        }
    }
    
    return (
        <div className='radio-language'>
            <input className='radio-language__input' type='radio' id={lang} name='language' defaultChecked={defaultChecked} onChange={onChange} />
            <label className='radio-language__label' htmlFor={lang} id={lang}>{capitalize(lang)}</label>
            <img src={flagIcon} alt={`flag ${lang}`} />
        </div>
    )
}

export default RadioLanguage