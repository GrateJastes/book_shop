import { Genre } from '../../Store/BooksLoader/types';
import { useState } from 'react';
import { BookEditor } from '../BookEditor/BookEditor';
import './Book.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface BookProps {
    id: number,
    isCreator: boolean;
    name: string;
    author: string;
    year: number;
    description?: string;
    genres: Array<Genre>

    onUpdate: () => void;
}


export function Book(props: BookProps) {
    const [ isEditing, setEditing ] = useState<boolean>(false);

    if (props.isCreator && !isEditing) {
        return (
            <div className="book creator-template">
                <button className="creator-template__button" onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        );
    }

    if (isEditing) {
        return (
            <BookEditor
                onUpdate={props.onUpdate}
                book={props}
                onCancel={() => setEditing(false)}
                isCreation={props.isCreator}
            />
        );
    }

    return (
        <div className="book">
            <div className="book__main-info">
                <span className="book__title">{props.name}</span>
                <div className="book__written-by">
                    <span className="book__author">{props.author}</span>
                    <span className="book__year">({props.year})</span>
                </div>
            </div>
            <div className="book__genres">
                {props.genres.map((genre, idx) => <span className="book__genre" key={idx}>{genre.name}</span>)}
            </div>
            <button onClick={() => setEditing(true)} className="book__edit-button">
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </div>
    );
}
