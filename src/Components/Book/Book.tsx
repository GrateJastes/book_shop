import { BookModel } from '../../Store/BooksLoader/types';
import { useState } from 'react';
import { BookEditor } from '../BookEditor/BookEditor';
import './Book.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useDeleteBookByIDMutation } from '../../Store/BooksLoader/BooksAPI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface BookProps {
    book?: BookModel;
    isCreator: boolean;
}


export function Book({isCreator = false, book}: BookProps) {
    const [bookDeletionTrigger] = useDeleteBookByIDMutation();

    const [isEditing, setEditing] = useState<boolean>(false);

    if (isCreator && !isEditing) {
        return (
            <div className="book creator-template">
                <button className="creator-template__button" onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
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

    const deleteBook = () => book && bookDeletionTrigger(book.id);

    return (
        <div className="book">
            <div className="book__field">
                <div className="book__field-name">Название</div>
                <div className="book__field-value">{book?.name}</div>
            </div>
            <div className="book__field">
                <div className="book__field-name">Автор</div>
                <div className="book__field-value">{book?.author}</div>
            </div>
            <div className="book__field">
                <div className="book__field-name">Жанры</div>
                <p className="book__genres">
                    {
                        book?.genres.map((genre, idx) => {
                            return (
                                <span key={idx}>
                                    {genre.name}{idx === book?.genres.length - 1 ? '' : ', '}
                                </span>
                            );
                        })
                    }
                </p>
            </div>
            <div className="book__field">
                <div className="book__field-name">Год публикации</div>
                <div className="book__field-value">{book?.year}</div>
            </div>

            <div className="book__buttons">
                <button onClick={() => setEditing(true)} className="book__button book__edit-button">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
                <button onClick={() => deleteBook()} className="book__button book__delete-button">
                    <FontAwesomeIcon color={'red'} icon={faTrashCan}/>
                </button>
            </div>
        </div>
    );
}
