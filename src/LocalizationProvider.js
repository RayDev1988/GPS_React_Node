import React, { createContext, useContext } from 'react';
import usePersistedState from './common/usePersistedState';

import af from './l10n/af.json';
import ar from './l10n/ar.json';
import az from './l10n/az.json';
import bg from './l10n/bg.json';
import bn from './l10n/bn.json';
import cs from './l10n/cs.json';
import da from './l10n/da.json';
import de from './l10n/de.json';
import el from './l10n/el.json';
import en from './l10n/en.json';
import es from './l10n/es.json';
import fa from './l10n/fa.json';
import fi from './l10n/fi.json';
import fr from './l10n/fr.json';
import he from './l10n/he.json';
import hi from './l10n/hi.json';
import hr from './l10n/hr.json';
import hu from './l10n/hu.json';
import id from './l10n/id.json';
import it from './l10n/it.json';
import ja from './l10n/ja.json';
import ka from './l10n/ka.json';
import kk from './l10n/kk.json';
import km from './l10n/km.json';
import ko from './l10n/ko.json';
import lo from './l10n/lo.json';
import lt from './l10n/lt.json';
import lv from './l10n/lv.json';
import ml from './l10n/ml.json';
import mn from './l10n/mn.json';
import ms from './l10n/ms.json';
import nb from './l10n/nb.json';
import ne from './l10n/ne.json';
import nl from './l10n/nl.json';
import nn from './l10n/nn.json';
import pl from './l10n/pl.json';
import pt from './l10n/pt.json';
import ptBR from './l10n/pt_BR.json';
import ro from './l10n/ro.json';
import ru from './l10n/ru.json';
import si from './l10n/si.json';
import sk from './l10n/sk.json';
import sl from './l10n/sl.json';
import sq from './l10n/sq.json';
import sr from './l10n/sr.json';
import sv from './l10n/sv.json';
import ta from './l10n/ta.json';
import th from './l10n/th.json';
import tr from './l10n/tr.json';
import uk from './l10n/uk.json';
import uz from './l10n/uz.json';
import vi from './l10n/vi.json';
import zh from './l10n/zh.json';
import zhTW from './l10n/zh_TW.json';

const languages = {
  af: { data: af, name: 'Afrikaans' },
  ar: { data: ar, name: '??????????????' },
  az: { data: az, name: 'Az??rbaycanca' },
  bg: { data: bg, name: '??????????????????' },
  bn: { data: bn, name: '???????????????' },
  cs: { data: cs, name: '??e??tina' },
  de: { data: de, name: 'Deutsch' },
  da: { data: da, name: 'Dansk' },
  el: { data: el, name: '????????????????' },
  en: { data: en, name: 'English' },
  es: { data: es, name: 'Espa??ol' },
  fa: { data: fa, name: '??????????' },
  fi: { data: fi, name: 'Suomi' },
  fr: { data: fr, name: 'Fran??ais' },
  he: { data: he, name: '??????????' },
  hi: { data: hi, name: '??????????????????' },
  hr: { data: hr, name: 'Hrvatski' },
  hu: { data: hu, name: 'Magyar' },
  id: { data: id, name: 'Bahasa Indonesia' },
  it: { data: it, name: 'Italiano' },
  ja: { data: ja, name: '?????????' },
  ka: { data: ka, name: '?????????????????????' },
  kk: { data: kk, name: '??????????????' },
  ko: { data: ko, name: '?????????' },
  km: { data: km, name: '???????????????????????????' },
  lo: { data: lo, name: '?????????' },
  lt: { data: lt, name: 'Lietuvi??' },
  lv: { data: lv, name: 'Latvie??u' },
  ml: { data: ml, name: '??????????????????' },
  mn: { data: mn, name: '???????????? ??????' },
  ms: { data: ms, name: '???????? ??????????' },
  nb: { data: nb, name: 'Norsk bokm??l' },
  ne: { data: ne, name: '??????????????????' },
  nl: { data: nl, name: 'Nederlands' },
  nn: { data: nn, name: 'Norsk nynorsk' },
  pl: { data: pl, name: 'Polski' },
  pt: { data: pt, name: 'Portugu??s' },
  ptBR: { data: ptBR, name: 'Portugu??s (Brasil)' },
  ro: { data: ro, name: 'Rom??n??' },
  ru: { data: ru, name: '??????????????' },
  si: { data: si, name: '???????????????' },
  sk: { data: sk, name: 'Sloven??ina' },
  sl: { data: sl, name: 'Sloven????ina' },
  sq: { data: sq, name: 'Shqip??ria' },
  sr: { data: sr, name: 'Srpski' },
  sv: { data: sv, name: 'Svenska' },
  ta: { data: ta, name: '???????????????' },
  th: { data: th, name: '?????????' },
  tr: { data: tr, name: 'T??rk??e' },
  uk: { data: uk, name: '????????????????????' },
  uz: { data: uz, name: 'O??zbekcha' },
  vi: { data: vi, name: 'Ti???ng Vi???t' },
  zh: { data: zh, name: '??????' },
  zhTW: { data: zhTW, name: '?????? (Taiwan)' },
};

const getDefaultLanguage = () => {
  const browserLanguages = window.navigator.languages ? window.navigator.languages.slice() : [];
  const browserLanguage = window.navigator.userLanguage || window.navigator.language;
  browserLanguages.push(browserLanguage);
  browserLanguages.push(browserLanguage.substring(0, 2));

  for (let i = 0; i < browserLanguages.length; i += 1) {
    let language = browserLanguages[i].replace('-', '');
    if (language in languages) {
      return language;
    }
    if (language.length > 2) {
      language = language.substring(0, 2);
      if (language in languages) {
        return language;
      }
    }
  }
  return 'en';
};

const LocalizationContext = createContext({
  languages,
  language: 'en',
  setLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = usePersistedState('language', getDefaultLanguage());

  return (
    <LocalizationContext.Provider value={{ languages, language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);

export const useTranslation = () => {
  const context = useContext(LocalizationContext);
  const { data } = context.languages[context.language];
  return (key) => data[key];
};

export const useTranslationKeys = (predicate) => {
  const context = useContext(LocalizationContext);
  const { data } = context.languages[context.language];
  return Object.keys(data).filter(predicate);
};
