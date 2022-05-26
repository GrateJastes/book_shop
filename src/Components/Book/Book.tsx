import { BookModel } from '../../Store/BooksLoader/types';
import { useState } from 'react';
import { BookEditor } from '../BookEditor/BookEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useDeleteBookByIDMutation } from '../../Store/BooksLoader/BooksAPI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Book.scss';

export interface BookProps {
    book?: BookModel;
    isCreator: boolean;
}


export function Book({ isCreator = false, book }: BookProps) {
    const [ bookDeletionTrigger ] = useDeleteBookByIDMutation();
    const [ isEditing, setEditing ] = useState<boolean>(false);

    if (!isEditing && isCreator) {
        return (
            <div className="book creator-template">
                <button className="creator-template__button" onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
        );
    }

    const deleteBook = () => book && bookDeletionTrigger(book.id);

    const editButton = (
        <button onClick={() => setEditing(true)} className="book__button book__edit-button">
            <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
    );
    const genres = book?.genres.map((genre, idx) =>
        <span key={idx}>
            {genre.name}{idx === book?.genres.length - 1 ? '' : ', '}
        </span>
    );

    return (
        <div className="book">
            <div className="book__info">
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
                        {genres}
                    </p>
                </div>
                <div className="book__field">
                    <div className="book__field-name">Год публикации</div>
                    <div className="book__field-value">{book?.year}</div>
                </div>
            </div>
            <div className="book__buttons">
                {editButton}
                <Popup
                    open={isEditing}
                    lockScroll={true}
                    onClose={() => setEditing(false)}
                    className={'book-editor'}>
                    <div className="modal">
                        <BookEditor
                            onSave={() => setEditing(false)}
                            book={book}
                            onCancel={() => setEditing(false)}
                            isCreation={isCreator}
                        />
                    </div>
                </Popup>
                <button onClick={deleteBook} className="book__button book__delete-button">
                    <FontAwesomeIcon color={'red'} icon={faTrashCan}/>
                </button>
            </div>
        </div>
    );
}
