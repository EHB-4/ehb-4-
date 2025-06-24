#!/usr/bin/env python3
"""
Voice Control System for Cursor IDE
Allows voice commands to control Cursor IDE operations
"""

import speech_recognition as sr
import keyboard
import pyautogui
import time
import json
import os
import sys
from datetime import datetime
import threading
import queue

class VoiceControlCursor:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.is_listening = False
        self.command_queue = queue.Queue()
        self.commands = {
            # File operations
            "new file": self.new_file,
            "save file": self.save_file,
            "open file": self.open_file,
            "close file": self.close_file,
            
            # Editing operations
            "copy": self.copy_text,
            "paste": self.paste_text,
            "cut": self.cut_text,
            "undo": self.undo,
            "redo": self.redo,
            "select all": self.select_all,
            
            # Navigation
            "go to line": self.go_to_line,
            "find": self.find_text,
            "replace": self.replace_text,
            "next tab": self.next_tab,
            "previous tab": self.previous_tab,
            
            # AI operations
            "ask ai": self.ask_ai,
            "explain code": self.explain_code,
            "optimize code": self.optimize_code,
            "fix errors": self.fix_errors,
            "generate test": self.generate_test,
            
            # Git operations
            "commit": self.git_commit,
            "push": self.git_push,
            "pull": self.git_pull,
            "status": self.git_status,
            
            # Terminal operations
            "open terminal": self.open_terminal,
            "run command": self.run_command,
            "stop listening": self.stop_listening,
            
            # Cursor specific
            "cursor chat": self.cursor_chat,
            "cursor explain": self.cursor_explain,
            "cursor refactor": self.cursor_refactor,
            "cursor debug": self.cursor_debug,
        }
        
        # Voice command patterns
        self.voice_patterns = {
            "new file": ["new file", "create file", "make file"],
            "save file": ["save file", "save", "save as"],
            "open file": ["open file", "open", "load file"],
            "copy": ["copy", "copy text", "copy selection"],
            "paste": ["paste", "paste text", "insert"],
            "cut": ["cut", "cut text", "remove"],
            "undo": ["undo", "go back", "reverse"],
            "redo": ["redo", "repeat", "forward"],
            "select all": ["select all", "select everything", "highlight all"],
            "ask ai": ["ask ai", "ai help", "artificial intelligence"],
            "explain code": ["explain code", "what does this do", "code explanation"],
            "optimize code": ["optimize code", "improve code", "make better"],
            "fix errors": ["fix errors", "error fix", "debug"],
            "generate test": ["generate test", "create test", "test code"],
            "commit": ["commit", "git commit", "save changes"],
            "push": ["push", "git push", "upload"],
            "pull": ["pull", "git pull", "download"],
            "open terminal": ["open terminal", "terminal", "command line"],
            "cursor chat": ["cursor chat", "chat", "ai chat"],
            "cursor explain": ["cursor explain", "explain", "what is this"],
            "cursor refactor": ["cursor refactor", "refactor", "restructure"],
            "cursor debug": ["cursor debug", "debug", "find bug"],
        }
        
        self.setup_logging()
        
    def setup_logging(self):
        """Setup logging for voice commands"""
        self.log_file = "logs/voice-control.log"
        os.makedirs("logs", exist_ok=True)
        
    def log_command(self, command, success=True):
        """Log voice commands"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        status = "SUCCESS" if success else "FAILED"
        log_entry = f"[{timestamp}] {status}: {command}\n"
        
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(log_entry)
            
    def listen_for_commands(self):
        """Main listening loop"""
        print("🎤 Voice Control for Cursor is now active!")
        print("Say 'stop listening' to exit")
        print("Available commands:", ", ".join(self.commands.keys()))
        
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=1)
            
        while self.is_listening:
            try:
                with self.microphone as source:
                    print("\n🎤 Listening...")
                    audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=10)
                    
                try:
                    text = self.recognizer.recognize_google(audio).lower()
                    print(f"🎯 Heard: {text}")
                    self.process_command(text)
                    
                except sr.UnknownValueError:
                    print("❓ Could not understand audio")
                except sr.RequestError as e:
                    print(f"❌ Error with speech recognition: {e}")
                    
            except KeyboardInterrupt:
                break
            except Exception as e:
                print(f"❌ Error: {e}")
                
    def process_command(self, text):
        """Process voice command and execute corresponding action"""
        for command, patterns in self.voice_patterns.items():
            for pattern in patterns:
                if pattern in text:
                    print(f"🚀 Executing: {command}")
                    try:
                        self.commands[command]()
                        self.log_command(command, True)
                        return
                    except Exception as e:
                        print(f"❌ Error executing {command}: {e}")
                        self.log_command(command, False)
                        return
                        
        print("❓ Command not recognized. Try again.")
        
    def execute_keyboard_shortcut(self, *keys):
        """Execute keyboard shortcuts"""
        try:
            keyboard.press_and_release('+'.join(keys))
            time.sleep(0.1)
        except Exception as e:
            print(f"❌ Error with keyboard shortcut: {e}")
            
    def type_text(self, text):
        """Type text using pyautogui"""
        try:
            pyautogui.write(text)
            time.sleep(0.1)
        except Exception as e:
            print(f"❌ Error typing text: {e}")
            
    # File operations
    def new_file(self):
        """Create new file"""
        self.execute_keyboard_shortcut('ctrl', 'n')
        print("📄 New file created")
        
    def save_file(self):
        """Save current file"""
        self.execute_keyboard_shortcut('ctrl', 's')
        print("💾 File saved")
        
    def open_file(self):
        """Open file dialog"""
        self.execute_keyboard_shortcut('ctrl', 'o')
        print("📂 Open file dialog")
        
    def close_file(self):
        """Close current file"""
        self.execute_keyboard_shortcut('ctrl', 'w')
        print("❌ File closed")
        
    # Editing operations
    def copy_text(self):
        """Copy selected text"""
        self.execute_keyboard_shortcut('ctrl', 'c')
        print("📋 Text copied")
        
    def paste_text(self):
        """Paste text"""
        self.execute_keyboard_shortcut('ctrl', 'v')
        print("📋 Text pasted")
        
    def cut_text(self):
        """Cut selected text"""
        self.execute_keyboard_shortcut('ctrl', 'x')
        print("✂️ Text cut")
        
    def undo(self):
        """Undo last action"""
        self.execute_keyboard_shortcut('ctrl', 'z')
        print("↶ Undone")
        
    def redo(self):
        """Redo last action"""
        self.execute_keyboard_shortcut('ctrl', 'y')
        print("↷ Redone")
        
    def select_all(self):
        """Select all text"""
        self.execute_keyboard_shortcut('ctrl', 'a')
        print("📝 All text selected")
        
    # Navigation
    def go_to_line(self):
        """Go to line dialog"""
        self.execute_keyboard_shortcut('ctrl', 'g')
        print("📍 Go to line")
        
    def find_text(self):
        """Find text dialog"""
        self.execute_keyboard_shortcut('ctrl', 'f')
        print("🔍 Find text")
        
    def replace_text(self):
        """Replace text dialog"""
        self.execute_keyboard_shortcut('ctrl', 'h')
        print("🔄 Replace text")
        
    def next_tab(self):
        """Next tab"""
        self.execute_keyboard_shortcut('ctrl', 'tab')
        print("➡️ Next tab")
        
    def previous_tab(self):
        """Previous tab"""
        self.execute_keyboard_shortcut('ctrl', 'shift', 'tab')
        print("⬅️ Previous tab")
        
    # AI operations
    def ask_ai(self):
        """Open AI chat in Cursor"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        print("🤖 AI chat opened")
        
    def explain_code(self):
        """Ask AI to explain code"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("explain this code")
        self.execute_keyboard_shortcut('enter')
        print("🤖 Code explanation requested")
        
    def optimize_code(self):
        """Ask AI to optimize code"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("optimize this code")
        self.execute_keyboard_shortcut('enter')
        print("🤖 Code optimization requested")
        
    def fix_errors(self):
        """Ask AI to fix errors"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("fix errors in this code")
        self.execute_keyboard_shortcut('enter')
        print("🤖 Error fixing requested")
        
    def generate_test(self):
        """Ask AI to generate tests"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("generate tests for this code")
        self.execute_keyboard_shortcut('enter')
        print("🤖 Test generation requested")
        
    # Git operations
    def git_commit(self):
        """Git commit"""
        self.execute_keyboard_shortcut('ctrl', 'shift', 'g')
        time.sleep(0.5)
        self.execute_keyboard_shortcut('enter')
        print("📝 Git commit")
        
    def git_push(self):
        """Git push"""
        self.execute_keyboard_shortcut('ctrl', 'shift', 'p')
        print("📤 Git push")
        
    def git_pull(self):
        """Git pull"""
        self.execute_keyboard_shortcut('ctrl', 'shift', 'p')
        time.sleep(0.5)
        self.type_text("pull")
        self.execute_keyboard_shortcut('enter')
        print("📥 Git pull")
        
    def git_status(self):
        """Git status"""
        self.execute_keyboard_shortcut('ctrl', 'shift', 'g')
        print("📊 Git status")
        
    # Terminal operations
    def open_terminal(self):
        """Open terminal"""
        self.execute_keyboard_shortcut('ctrl', '`')
        print("💻 Terminal opened")
        
    def run_command(self):
        """Run command in terminal"""
        self.execute_keyboard_shortcut('ctrl', '`')
        time.sleep(0.5)
        print("💻 Ready for command input")
        
    # Cursor specific operations
    def cursor_chat(self):
        """Open Cursor chat"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        print("💬 Cursor chat opened")
        
    def cursor_explain(self):
        """Ask Cursor to explain"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("explain")
        self.execute_keyboard_shortcut('enter')
        print("💬 Cursor explanation requested")
        
    def cursor_refactor(self):
        """Ask Cursor to refactor"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("refactor this code")
        self.execute_keyboard_shortcut('enter')
        print("💬 Cursor refactoring requested")
        
    def cursor_debug(self):
        """Ask Cursor to debug"""
        self.execute_keyboard_shortcut('ctrl', 'k')
        time.sleep(0.5)
        self.type_text("debug this code")
        self.execute_keyboard_shortcut('enter')
        print("💬 Cursor debugging requested")
        
    def stop_listening(self):
        """Stop voice control"""
        self.is_listening = False
        print("🛑 Voice control stopped")
        
    def start(self):
        """Start voice control system"""
        self.is_listening = True
        self.listen_for_commands()
        
    def test_microphone(self):
        """Test microphone functionality"""
        print("🎤 Testing microphone...")
        try:
            with self.microphone as source:
                self.recognizer.adjust_for_ambient_noise(source, duration=2)
                print("🎤 Say something to test...")
                audio = self.recognizer.listen(source, timeout=5)
                
            text = self.recognizer.recognize_google(audio)
            print(f"✅ Microphone test successful! Heard: {text}")
            return True
        except Exception as e:
            print(f"❌ Microphone test failed: {e}")
            return False

def main():
    """Main function"""
    print("🎤 Voice Control for Cursor IDE")
    print("=" * 50)
    
    voice_control = VoiceControlCursor()
    
    # Test microphone first
    if not voice_control.test_microphone():
        print("❌ Microphone test failed. Please check your microphone settings.")
        return
        
    print("\n🎯 Voice Control Commands:")
    print("- File: new file, save file, open file, close file")
    print("- Edit: copy, paste, cut, undo, redo, select all")
    print("- Navigation: go to line, find, replace, next tab, previous tab")
    print("- AI: ask ai, explain code, optimize code, fix errors, generate test")
    print("- Git: commit, push, pull, status")
    print("- Terminal: open terminal, run command")
    print("- Cursor: cursor chat, cursor explain, cursor refactor, cursor debug")
    print("- Control: stop listening")
    
    try:
        voice_control.start()
    except KeyboardInterrupt:
        print("\n🛑 Voice control stopped by user")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
