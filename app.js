

function getSearchResult() {
        clearSearch();
        const searchKeyword = document.getElementById('search-input').value
        fetch(`https://api.lyrics.ovh/suggest/${searchKeyword}`)
        .then(res => res.json())
                .then(data => {  
                        storedData = data;
            console.log(data);
                for (let i = 0, j= 0; i < data.data.length && i < 10, j < 10; i++, j++) {
                        const title = data.data[i].title;
                        const preview = data.data[i].preview;
                        const artistName = data.data[i].artist.name;
                        const id = data.data[i].id;
                        const albumCover = data.data[i].album.cover_xl;
                        const albumTitle = data.data[i].album.title;
                        let lyrics= getLyrics(artistName,title);
                        
                        document.getElementById('search-results').innerHTML += 
                                                                `
                                                                <div class="single-result row align-items-center my-3 p-3 d-flex justify-content-center">
                                                                    <div class="col-md-2">
                                                                        <img style="border-radius: 10px;" src="${albumCover}" alt="${albumTitle}" width="100%">
                                                                        </div>
                                                                    <div class="col-md-7">
                                                                        <h5 class="lyrics-name">${title} - ${artistName}</h5>
                                                                        <p class="author lead"><strong>Album: </strong><span>${albumTitle}</span></p>
                                                                    </div>
                                                                    <div class="col-md-3 text-md-right text-center">
                                                                    <a href="#main">
                                                                    <button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button>
                                                                    </a>
                                                                         
                                                                    </div>
                                                                    <audio class=" col-md-8 align-items-center p-2" controls>
                                                                        <source src="${preview}" type="audio/mpeg">
                                                                        </audio>
                                                                </div>
                                                              
                                                                        `;
                        
                                                                
                
            }
        })
    }
    
function clearSearch() {
        document.getElementById('search-results').innerHTML = '';  
        document.getElementById('all-lyrics').innerHTML = '';  
}

function getLyrics(id) {

                for (let i = 0; i < 10; i++) {
                        if(storedData.data[i].id == id){
                            const artistName = storedData.data[i].artist.name;
                            const songTitle = storedData.data[i].title;
                            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
                            .then(res => res.json())
                            .then(data => {
                                let lyrics = data.lyrics;
                                if(lyrics == undefined){
                                    lyrics = `Not Found. Please Try Another one`;
                                }
                                document.getElementById('all-lyrics').innerHTML = `
                                                                                            <h2 class="text-success mb-4">${songTitle} - ${artistName}</h2>
                                                                                           <h5><pre style="color:white;" >${lyrics}</pre></h5> 
                                                                                        </div>`
                            })
                            
                            
                        }
                    
        }
        
    }
