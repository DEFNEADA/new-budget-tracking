export const addPasswordToggle = (id) => {
    const input = document.getElementById(id);
    if (!input) return;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const icon = document.createElement('i');
    icon.className = 'fa fa-eye';

    Object.assign(icon.style, {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#888',
        zIndex: '10',
    });

    wrapper.appendChild(icon);

    icon.addEventListener('click', () => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.className = type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
    });
};
