import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { addVideo, uploadvideo } from '../modules/videoManager'


const AddVideo = () => {
    const emptyVideo = {
        Title: "",
        Description: "",
        Url: ""
    }
    const upload = {
        UserUploadedVideo: null
    }
    const history = useHistory();
    const [video, setVideo] = useState({ emptyVideo })

    const handleInputChange = (event) => {
        const newVideo = { ...video };
        let selectedValue = event.target.value
        newVideo[event.target.id] = selectedValue
        setVideo(newVideo)
    }
    const handleSaveVideo = (click) => {
        click.preventDefault()

        if (video.Title === "") {
            window.alert("Please fill in all fields")

        } else {
            addVideo(video).then((p) => {
                // Navigate the user back to the home route
                history.push("/");
            });
        }


    }

    const setuploadvideo = () => {
        debugger
        uploadvideo(upload.UserUploadedVideo).then(res => console.log(res))
    }

    return (
        <div>
            <form className="upload">
            <fieldset>
                <div className="upload">
                    <label htmlFor="VideoFile">Or upload a video</label>
                    <input type="file" 
                        id="UserUploadedVideo"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="website"
                        value={upload.UserUploadedVideo} />
                </div>
                <button className="article-btn"
                    onClick={setuploadvideo}>
                    Upload Video
                </button>
            </fieldset>
            </form>

            <form className="videoForm">
                <h3 className="videoForm-title">Add Video</h3>
                <fieldset>
                    <div className="videoForm-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            id="Title"
                            onChange={handleInputChange}
                            autoFocus
                            required
                            className="form-control"
                            placeholder="Title"
                            value={video.Title} />
                    </div>
                    <div className="videoForm-group">
                        <label htmlFor="Description">Description</label>
                        <input type="text"
                            id="Description"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="What is the video about"
                            value={video.Description} />
                    </div>
                    <div className="videoForm-group" >
                        <label htmlFor="Url">Url</label>
                        <input type="text"
                            id="Url"

                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="website"
                            value={video.Url} />
                    </div>
                </fieldset>

                <button className="article-btn"
                    onClick={handleSaveVideo}>
                    Save Video
                </button>
                {/* <button className="article-btn"
				onClick={handleCancelSave}>
				Cancel
            </button> */}
            </form>
         </div>
    )
}

export default AddVideo;