let searchBar = document.querySelector('.search-bar');
let searchBtn = document.querySelector('.search-btn');
let form = document.querySelector('form');
let table = document.querySelector('.table-responsive');
let tableBody = document.querySelector('.table-body');
let showLyricsEl = document.querySelector('.show-lyrics');




//Musixmatch API

const apiURL = 'https://api.lyrics.ovh';

async function searchData(term){
    const res = await  fetch(`${apiURL}/suggest/${term}`);
   const data = await res.json();
    const results = data.data;
    console.log(data);
   displayResults(results)
}



async function displayResults(data){
    const results = [];
    tableBody.innerHTML = '';
    showLyricsEl.innerHTML = '';

    data.forEach(item=>{
        results.push({
            artist: item.artist.name,
            song: item.title,
            thumbnail: item.album.cover_medium
        });
    });

    results.forEach(result =>{
      const element = document.createElement('tr');  
        element.innerHTML = ` <td class='thumbnail'>
        <img src="${result.thumbnail}" alt="${result.song}">
        </td>
        <td>${result.artist}</td>
        <td>${result.song}</td>
        <td><button class='btn btn-success' onclick="displayLyrics('${result.artist}', '${result.song}' )">Get Lyrics</button></td>`;

      tableBody.appendChild(element);
    });
    table.style.display = 'flex';
}


async function displayLyrics(artist, song){
    const res = await  fetch(`${apiURL}/v1/${artist}/${song}`);
    const data = await res.json();
   console.log(data) 
   let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    table.style.display = 'none';
    showLyricsEl.innerHTML = `
    <h2>${song} - ${artist}</h2>
    <span>${lyrics}</span>`;
}



form.addEventListener('submit', (e)=>{
e.preventDefault();
    if(!searchBar.value){
        alert("eeh");
    }else{
    const term = searchBar.value.trim();        
        searchData(term);
        searchBar.value = '';
    }
    
});
