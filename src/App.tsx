import { FormEvent, useRef } from "react";
import LinkList from "./components/LinkList";
import db from "./db";
import Footer from "./components/Footer";
import SubmitForm from "./components/SubmitForm";

type Link = {
  url: string;
  title: string;
  tag: string;
  category: string;
};

function App() {
  const formRef = useRef<HTMLFormElement>(null);

  const getUrlAndTitle = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return { url: tab.url, title: tab.title };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = await getUrlAndTitle();
    // const url = "http://www.example.com";
    const linkData = {
      url: data.url,
      // url: url,
      // title: "Title",
      title: data.title,
      tag: formData.get("tag"),
      category: formData.get("category"),
    } as Link;

    try {
      const existingLink = await db.links
        .where("url")
        .equals(linkData.url)
        .toArray();

      if (existingLink.length > 0) {
        alert("Link already exists in your vault!");
        return;
      }

      await db.links.add({
        url: linkData.url,
        title: linkData.title,
        tag: linkData.tag,
        category: linkData.category,
      });
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col p-4 pb-0 bg-primary text-white h-[700px] w-[450px] overflow-y-auto">
      <h1 className="text-xl text-center mb-2">Link Vault</h1>
      <SubmitForm handleSubmit={handleSubmit} formRef={formRef} />
      <LinkList dbInstance={db}/>
      <Footer />
    </div>
  );
}

export default App;
