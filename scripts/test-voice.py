#!/usr/bin/env python3
"""
Simple Voice Recognition Test
Tests if microphone and speech recognition are working
"""

import speech_recognition as sr
import time

def test_voice_recognition():
    """Test voice recognition functionality"""
    print("🎤 Voice Recognition Test")
    print("=" * 30)
    
    # Initialize recognizer and microphone
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    try:
        # List available microphones
        print("📱 Available microphones:")
        for index, name in enumerate(sr.Microphone.list_microphone_names()):
            print(f"  {index}: {name}")
        
        print(f"\n🎤 Using microphone: {sr.Microphone.list_microphone_names()[0]}")
        
        # Adjust for ambient noise
        with microphone as source:
            print("🔇 Adjusting for ambient noise... Please be quiet.")
            recognizer.adjust_for_ambient_noise(source, duration=2)
            print("✅ Ambient noise adjustment complete!")
        
        # Test listening
        print("\n🎤 Say something to test voice recognition...")
        print("(You have 5 seconds to speak)")
        
        with microphone as source:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=5)
        
        print("🎯 Processing speech...")
        
        # Recognize speech
        try:
            text = recognizer.recognize_google(audio)
            print(f"✅ Success! You said: '{text}'")
            return True
        except sr.UnknownValueError:
            print("❌ Could not understand what you said")
            return False
        except sr.RequestError as e:
            print(f"❌ Error with speech recognition service: {e}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_whisper():
    """Test OpenAI Whisper if available"""
    print("\n🤖 Testing OpenAI Whisper...")
    try:
        import whisper
        model = whisper.load_model("base")
        print("✅ Whisper model loaded successfully!")
        return True
    except ImportError:
        print("❌ Whisper not installed. Run: pip install openai-whisper")
        return False
    except Exception as e:
        print(f"❌ Error loading Whisper: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Voice Control System Test")
    print("=" * 40)
    
    # Test basic voice recognition
    voice_test = test_voice_recognition()
    
    # Test Whisper
    whisper_test = test_whisper()
    
    print("\n📊 Test Results:")
    print(f"Voice Recognition: {'✅ PASS' if voice_test else '❌ FAIL'}")
    print(f"Whisper: {'✅ PASS' if whisper_test else '❌ FAIL'}")
    
    if voice_test and whisper_test:
        print("\n🎉 All tests passed! Voice control system is ready.")
        print("You can now run: python scripts/voice-control-cursor.py")
    else:
        print("\n⚠️ Some tests failed. Please check your setup.")
        
    input("\nPress Enter to exit...")

if __name__ == "__main__":
    main()
