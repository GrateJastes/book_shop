import { BookModel, Genre } from '../../Store/BooksLoader/types';
import { useState } from 'react';
import { BookEditor } from '../BookEditor/BookEditor';
import './Book.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface BookProps {
    book?: BookModel;
    isCreator: boolean;
}


export function Book({isCreator=false, book}: BookProps) {
    const [ isEditing, setEditing ] = useState<boolean>(false);

    if (isCreator && !isEditing) {
        return (
            <div className="book creator-template">
                <button className="creator-template__button" onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        );
    }

    if (isEditing && book) {
        return (
            <BookEditor
                book={book}
                onCancel={() => setEditing(false)}
                isCreation={isCreator}
            />
        );
    }

    return (
        <div className="book">
            <div className="book__main-info">
                <span className="book__title">{book?.name}</span>
                <div className="book__written-by">
                    <span className="book__author">{book?.author}</span>
                    <span className="book__year">({book?.year})</span>
                </div>
            </div>
            <div className="book__genres">
                {book?.genres.map((genre, idx) => <span className="book__genre" key={idx}>{genre.name}</span>)}
            </div>
            <button onClick={() => setEditing(true)} className="book__edit-button">
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </div>
    );
}
