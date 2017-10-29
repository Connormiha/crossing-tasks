import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Character from 'components/common/Character';


const CharactersBlock = [
    'cabbage',
    'farmer',
    'sheep',
    'wolf',
    'dog',
    'caveman',
    'priest',
    'woman_black',
    'woman_white',
    'woman_red',
    'woman_blue',
    'men_black',
    'men_white',
    'men_red',
    'men_blue',
    'boy_red',
    'boy_yellow',
    'girl_red',
    'girl_yellow',
    'policeman',
    'criminal',
    'monkey',
    'gorilla',
].map((item) =>
    <div style={{display: 'inline-block', margin: '10px'}}>
        <Character onClick={action(`Click ${item}`)} name={item} id={`id_${item}`} />
    </div>
);

storiesOf('Character', module)
    .add('Simple', () => {
        return (
            <div style={{background: '#4a8841'}}>
                {CharactersBlock}
            </div>
        );
});
