
export const userGridTemplate = (user) => (`
    <span title="${user._id}">
        ${user._id}
    </span>
    <span title="Klik for at ændre profil billede \nfor ${user.username}">
        <form id="profile-image-${user._id}">
            <label for="image-file-${user._id}">
                <div class="grid-profile-image" style="background:url(http://localhost:3000/${user.profile});background-size: cover"></div>
            </label>
            <input type="file" name="image" id="image-file-${user._id}">
        </form>
    </span>
    <span title="${user.username}">
        <form id="profile-name-${user._id}" class="grid-update-form">
            <input id="inpGridUserOldName" class="grid-hidden-input" type="text" value=" ${user.username}"/>
            <input id="inpGridUserNewName" type="text" value=" ${user.username}"/>
        </form>
    </span>
    <span class="grid-actions" title="Slet ${user.username}">
        <button class="delete-action" data-action-delete="${user.username}">Slet</button>
    </span>`
);



export const emptyTemplate = `<span>...</span><span>...</span><span>...</span><span>...</span>`;
