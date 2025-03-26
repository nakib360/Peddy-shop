
const getCategory = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
        const data = await res.json();
        getCategoryBtn(data.categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
    }
};


const getPets = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
        const data = await res.json();
        
        getSinglePet(data.pets);
    } catch (err) {
        console.error("Error fetching pets:", err);
    }
};


const getCategoryPets = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
        const data = await res.json();
        removeActive();

        document.getElementById(`${id}`).classList.add("border-[#0E7A81]", "bg-[#17919a4b]", "rounded-full", "text-white")
        document.getElementById(`${id}`).classList.remove("border-[#17919a4b]", "rounded-xl")
        getSinglePet(data.data);
    } catch (err) {
        console.error("Error fetching category pets:", err);
    }
};

const petDetail = async (id) => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const data = await res.json();

        petSinglePetDetail(data.petData);
    }catch (err){
        console.error("Error:", err);
    }
}

const petSinglePetDetail = (item) => {

              const overlay = document.createElement("div");
              overlay.className = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"  
              const popup = document.createElement("div");
              popup.className = "max-h-[500px] overflow-y-scroll fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 rounded-xl z-20 px-5 py-5"
              popup.innerHTML = `
                    <img class="w-[400px] h-[250px] rounded-xl" src="${item.image}" />
                    <p class="mt-5 text-2xl font-bold">${item.pet_name}</p>
                    <div class="flex justify-between items-center mt-3">
                        <div class="">
                            <div class="flex gap-2">
                                <img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=44642&format=png" />
                                <p>Breed: ${item.breed}</p>            
                            </div>
                            <div class="flex gap-2">
                                <img class="h-5 w-5" src="https://img.icons8.com/?size=30&id=77841&format=png" />
                                <p>Gender: ${item.gender}</p>
                            </div>
                            <div class="flex gap-2">
                                <img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=2vZxGT3pkXQN&format=png" />
                                <p>vaccinated status: ${item.vaccinated_status}</p>
                            </div>
                        </div>
                        <div class="">
                            <div class="flex gap-2">
                                <img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=89201&format=png" />
                                <p>Birth: ${item.date_of_birth}</p>
                            </div>
                            <div class="flex gap-2">
                                <img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=7164&format=png" />
                                <p>Price: ${item.price}$</p>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-3 border border-slate-300">
                    <p class="text-xl font-bold mt-3">Details Information</p>
                    <P class="text-sm text-slate-500 mt-3 w-[400px] text-justify">${item.pet_details}</P>
                    <button class="mt-10 cancel w-full h-10 bg-[#0e7a813d] rounded-[10px] font-bold">Cancel</button>
              `
              const cacelBtn = popup.querySelector(".cancel");
              cacelBtn.addEventListener("click", () => {
                  popup.remove()
                  overlay.remove()

              })
              document.body.append(overlay);
              document.body.append(popup);
}



const removeActive = () => {
    const btns = document.getElementsByClassName("category-btn")
    for(const btn of btns){
        btn.classList.remove("border-[#0E7A81]", "bg-[#17919a4b]", "rounded-full", "text-white")
        btn.classList.add("border-[#17919a4b]", "rounded-xl")
    }
}

const getCategoryBtn = (items) => {
    const categoryBtns = document.getElementById("category-btn"); 

    items.forEach((item) => {
        const button = document.createElement("button");
        button.className = "category-btn flex justify-center items-center gap-2 border border-1 border-[#17919a4b] rounded-xl py-2 px-3 w-44 hover:border-[#0E7A81] hover:bg-[#17919a4b] hover:rounded-full hover:text-white";
        button.id = `${item.category}`
        button.innerHTML = `
            <img class="h-8 w-8" src="${item.category_icon}" />
            <p class="text-xl font-bold">${item.category}</p>
        `;

        button.addEventListener("click", () => getCategoryPets(item.category));
        categoryBtns.appendChild(button);
    });
};


const getSinglePet = (items) => {
    const pets = document.getElementById("pets");
    const likedPets = document.getElementById("liked-pets");

    pets.innerHTML = ""; 

    if(items.length === 0){
        pets.classList.remove("grid", "overflow-y-scroll");
        likedPets.classList.remove("w-[600px]");
        likedPets.classList.add("w-[300px]");
        pets.innerHTML = `
            <div class="h-[800px] w-[850px] rounded-xl bg-[#D2DCFD] gap-2 flex flex-col justify-center items-center">
                <img src="images/error.webp" class="" />
                <p class="text-2xl font-bold">No Information Available</p>
                <p class="text-sm text-slate-500 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        return
    }else{
        pets.classList.add("grid");
    }

    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("px-5", "py-5", "border", "border-black", "rounded-xl", "flex", "flex-col", "gap-2");
        div.innerHTML = `
            <img class="rounded-xl" src="${item.image}" />
            <p class="text-2xl font-bold">${item.pet_name}</p>
            <div class="flex gap-2">
                <img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=44642&format=png" />
                <p>Breed: ${item.breed}</p>            
            </div>
            <div class="flex gap-2">
                <img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=89201&format=png" />
                <p>Birth: ${item.date_of_birth}</p>
            </div>
            <div class="flex gap-2">
                <img class="h-5 w-5" src="https://img.icons8.com/?size=30&id=77841&format=png" />
                <p>Gender: ${item.gender}</p>
            </div>
            <div class="flex gap-2">
                <img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=7164&format=png" />
                <p>Price: ${item.price}$</p>
            </div>
            <hr>
            <section class="flex items-center gap-2">
                <div class="like-btn border border-[#0E7A81] rounded-xl px-2 py-2 w-1/3 flex justify-center items-center hover:border-[#0E7A81] hover:bg-[#17919a4b]">
                    <img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=Y0Qk4tjejM1d&format=png" />
                </div>
                <div class="adopt border border-[#0E7A81] rounded-xl text-sm font-bold text-[#0E7A81] px-2 py-2 w-1/3 flex justify-center items-center hover:border-[#0E7A81] hover:bg-[#17919a4b] hover:text-black">Adopt</div>
                <div onclick="petDetail('${item.petId}')" class="Detail border border-[#0E7A81] rounded-xl text-sm font-bold text-[#0E7A81] px-2 py-2 w-1/3 flex justify-center items-center hover:border-[#0E7A81] hover:bg-[#17919a4b] hover:text-black">Details</div>
            </section>
        `;

        
        const likeButton = div.querySelector(".like-btn");
        likeButton.addEventListener("click", () => {

            if (![...likedPets.children].some(child => child.dataset.id === item.id)) {
                const liked = document.createElement("div");
                liked.dataset.id = item.id;
                liked.innerHTML = `<img class="rounded-xl" src="${item.image}"/>`;
                likedPets.appendChild(liked);
            }
        });

        const adoptDiv = div.querySelector(".adopt");
        adoptDiv.addEventListener("click", () => {
                adoptDiv.classList.add("opacity-50", "pointer-events-none");
                adoptDiv.innerText = "Adopted";
        });

        

        

        pets.appendChild(div);
    });

    pets.classList.toggle("overflow-y-scroll", pets.children.length > 5);
};


getPets();
getCategory();
