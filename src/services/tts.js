import { create, getURL } from "./storage"

export const getWavBase64 = async (word, googleUlrDemoTTS = "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03AGdBq24yby-DHv6WPL3yYtwkfiGTbX1QydU9Br84iSm18nEQp7N0bpKNoiYRKSj4L-hDJY0hR0fk0mP0j_ZT9upUUZgeOtF0A0fH_vo5ZqKpY5iaDDQ7DbcIII4-RDtYrIb03x6qm1JsBzC2RmrW5Xe2v4bidjIfBoqvq29NzLB0LyBmIzhM4_-PqyRakbM3HmOtXXJVGg3st5koTXHyDSHDpcN8RXqj4hA5NsJvbA85OUBAsHXhi1cqobkjlHXweuwo6rW9u9EXFk7ZNbjCFLLuebeIdS1GP_zRLmnV5MRdD0dLwYbSaMi3C83X3l6Z1H5pJ2MANikOnlTKiJ4x9DsJJrN1doHjsXd-bfChIfPNabfwQeDXMBPmkPDGym6_cW6EGVvqFnYUCHoT_BxIjDRbVXyr7d3LVHegWRJQ_9vrylWbzo2aBiaCNaMTBYClTxK5L_EBLaAN") => {
  const response = await fetch(googleUlrDemoTTS, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      "content-type": "text/plain;charset=UTF-8",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://www.gstatic.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify({
      "input": {
        "text": word
      },
      "voice": {
        "languageCode": "en-US",
        "name": "en-US-Wavenet-D"
      },
      "audioConfig": {
        "audioEncoding": "LINEAR16",
        "pitch": 0,
        "speakingRate": 1
      }
    }),
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  })
  const { audioContent } = await response.json()
  return audioContent
}

export const speech = async (word) => {
  const soundURL = await getURL(word);
  if (soundURL) {
    const audio = new Audio(soundURL);
    audio.play()
    return
  }
  const base64 = await getWavBase64(word);
  await create(word, base64)
  return speech(word)
}