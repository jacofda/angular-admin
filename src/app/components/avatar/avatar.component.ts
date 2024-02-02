import { Component, Input } from '@angular/core'
import { User } from 'app/core/user/user.types'
import colors from 'tailwindcss/colors'

@Component({
    selector: 'mow-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
    @Input() user: User
    @Input() size: number = 30

    constructor() {}

    get avatar(): string {
        // TODO: Da implementare l'upload dell'avatar
        if (this.user.avatar) {
            return this.user.avatar
        }

        const radius = this.size / 2;

        // Create the SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', (radius * 2).toString());
        svg.setAttribute('height', (radius * 2).toString());
      
        // Create the circle for the background
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', radius.toString());
        circle.setAttribute('cy', radius.toString());
        circle.setAttribute('r', radius.toString());
        circle.style.fill = this.background;
      
        // Create the text for the initials
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', `${radius}px`);
        text.setAttribute('y', `${radius * 1.1}px`);
        text.setAttribute('text-anchor', "middle");
        text.setAttribute('alignment-baseline', "middle");
        text.style.fill = 'white';
        text.style.fontFamily = 'Arial';
        text.style.fontSize = `70%`;
        text.style.fontWeight = 'bold';
        text.textContent = this.initials;

        // Append the circle and text to the SVG
        svg.appendChild(circle);
        svg.appendChild(text);
      
        // Finally, return the SVG as a string, in data URL format
        return 'data:image/svg+xml;base64,' + window.btoa(new XMLSerializer().serializeToString(svg));
    }

    get initials(): string {
        const names = this.user.name.split(' ')
        if (names.length > 1) {
            return names
                .map((n) => n[0])
                .join('')
                .toUpperCase()
        }

        return this.user.name.substring(0, 2).toUpperCase()
    }

    get background(): string {
        let hash = 0
        this.initials.split('').forEach((char) => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })

        const index = Math.abs(hash % Object.keys(colors).length)
        const color = Object.keys(colors)[index]
        return colors[color][600]
    }
}
