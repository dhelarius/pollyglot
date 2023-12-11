import { useRef, useState } from 'react'
import './App.css'
import worldMap from './assets/world-map.svg'
import parrot from './assets/parrot.svg'
import frFlag from './assets/fr-flag.svg'
import spFlag from './assets/sp-flag.svg'
import jpnFlag from './assets/jpn-flag.svg'
import LabelInstruction from './components/label-instruction/LabelInstruction'
import Control from './components/control/Control'
import RadioLanguage from './components/radio-language/RadioLanguage'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Loader from './components/loader/Loader'
import useTranslate from './hooks/use-translate'

function App() {
  const [language, setLanguage] = useState('french')
  const [prompt, setPrompt] = useState('')
  const refPrompt = useRef(null)
  const { translation, isLoading, error, getTranslation, reset } = useTranslate()

  const isSubmit = (translation.length > 0) || (error != null)
  const isEmptyPrompt = prompt.length == 0

  const onSubmit = e => {
    e.preventDefault()

    if (isSubmit) {
      reset()
      setLanguage('french')
      clearPrompt()
      return
    }

    getTranslation(language, prompt)
  }

  const clearPrompt = () => {
    setPrompt('')
    const textareaPrompt = refPrompt.current
    textareaPrompt.value = ''
  }

  return (
    <>
      <header role='banner' className='banner'>
        <img className='banner__worldmap' src={worldMap} alt='world map' />
        <div className='logo'>
          <img src={parrot} alt='parrot' />
          <div>
            <h1 className='logo__title'>Pollyglot</h1>
            <h2 className='logo__slogan'>Perfect Translation Every Time</h2>
          </div>
        </div>
      </header>
      <main role='main' className='main'>
        <section role='translator' className='translator'>
          <form className='form' onSubmit={onSubmit}>
            <div className='error' style={{visibility: error ? 'visible' : 'hidden'}}>
              <p className='error__message'>{error ? error.message : ''}</p>
            </div>
            <div className='form__controls' style={{visibility: error ? 'hidden' : 'visible'}}>
              <Control>
                  <LabelInstruction text={isSubmit ? 'Original text' : 'Text to translate'} />
                  <div className='prompt'>
                    <textarea ref={refPrompt} className='textarea' disabled={isSubmit} onChange={e => setPrompt(e.target.value)}  />
                    {!isEmptyPrompt && !isSubmit ? <ArrowUturnLeftIcon className='prompt__clear-button' onClick={clearPrompt} /> : null}
                  </div>
                </Control>
                <Control>
                  <LabelInstruction text={isSubmit ? 'Your translation' : 'Select language'} />
                  {isSubmit ? (
                    <textarea className='textarea' disabled value={translation} />
                  ) : 
                  (
                    <fieldset>
                      <RadioLanguage lang='french' flagIcon={frFlag} defaultChecked onLanguage={setLanguage} />
                      <RadioLanguage lang='spanish' flagIcon={spFlag} onLanguage={setLanguage} />
                      <RadioLanguage lang='japanese' flagIcon={jpnFlag} onLanguage={setLanguage}  />
                    </fieldset>
                  )}
                </Control>
            </div>
            <button className='submit' disabled={isEmptyPrompt || isLoading} type='submit'>{isLoading ? <Loader /> : (isSubmit ? 'Start Over' : 'Translate')}</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default App
