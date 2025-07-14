import wikipedia

def summarize_topic():
    try:
        topic = input("🔍 Enter a topic to search on Wikipedia: ").strip()
        summary = wikipedia.summary(topic, sentences=5)
        print("\n📄 Wikipedia Summary:\n")
        print(summary)

    except wikipedia.exceptions.DisambiguationError as e:
        print("⚠️ The topic is ambiguous. Suggestions:")
        print(", ".join(e.options[:5]))

    except wikipedia.exceptions.PageError:
        print("❌ No page found for the given topic.")

    except Exception as e:
        print("⚠️ An unexpected error occurred:", str(e))

if __name__ == "__main__":
    summarize_topic()
