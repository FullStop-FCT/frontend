import { useState, useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';





const TagsInput = props => {
  const { setKeywords } = useContext(AuthContext);
  const [tags, setTags] = useState(props.tags);
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    setKeywords([...tags.filter((_, index) => index !== indexToRemove)])
  };
  const addTags = event => {
    if (event.target.value !== "" && [...tags, event.target.value].length <= 5) {
      setTags([...tags, event.target.value.toLowerCase()]);
      setKeywords([...tags, event.target.value.toLowerCase()])
      props.selectedTags([...tags, event.target.value.toLowerCase()]);
      event.target.value = "";
      //  console.log(tag.lenght())
    }
  };
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
        placeholder="Adicione ate 5 palavras-chave e pressiona enter"
      />
    </div>
  );
};

export default function KeyWord() {
  const selectedTags = tags => {
    console.log(tags);
  };
  return (
    <div className="App">
      <TagsInput selectedTags={selectedTags} tags={[]} />
    </div>
  );
};

