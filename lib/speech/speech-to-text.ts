import { SpeechClient } from '@google-cloud/speech';

const SPEECH_API_KEY = 'AIzaSyB2RWZ0q_BkTewzG-GYDmTunYVslSaaA94';

const speechClient = new SpeechClient({
  key: SPEECH_API_KEY,
});

export const transcribeAudio = async (audioContent: Buffer) => {
  const request = {
    audio: {
      content: audioContent.toString('base64'),
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  };

  try {
    const [response] = await speechClient.recognize(request);
    return response.results?.map(result => result.alternatives?.[0]?.transcript).filter(Boolean);
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};
