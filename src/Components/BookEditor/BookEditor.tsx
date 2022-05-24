import 'react-datepicker/dist/react-datepicker.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BookModel, MultiSelectOption } from '../../Store/BooksLoader/types';
import {
    useDeleteBookByIDMutation,
    usePatchBookByIDMutation,
    usePostNewBookMutation
} from '../../Store/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import './BookEditor.scss';


export interface BookEditorProps {
    book?: BookModel;
    isCreation: boolean;
    onCancel: () => void;
}

interface EditorFields {
    name: string | null;
    author: string | null;
    year: number | null;
    description: string | null;
    genres: Array<MultiSelectOption> | null;
}

const initialEditorFields = {
    name: null,
    author: null,
    year: null,
    description: null,
    genres: null,
};


export function BookEditor({book, isCreation=false, onCancel}: BookEditorProps) {
    const [editorFields, setEditorFields] = useState<EditorFields>(initialEditorFields);

    const [bookCreationTrigger] = usePostNewBookMutation();
    const [bookPatchingTrigger] = usePatchBookByIDMutation();
    const [bookDeletionTrigger] = useDeleteBookByIDMutation();

    const inputIsCorrect = () => !!(editorFields.name && editorFields.author && editorFields.genres && editorFields.year);

    const saveEditedBook = (ev: FormEvent) => {
        ev.preventDefault();

        if (!inputIsCorrect()) {
            return;
        }

        const commonBookFields = {
            name: editorFields.name,
            author: editorFields.author,
            year: editorFields.year,
            genreIds: editorFields.genres?.map((option) => option.value) || null,
        }

        isCreation ?
            bookCreationTrigger({
                ...commonBookFields,
                id: 0,
                description: editorFields.description || '',
            })
            : bookPatchingTrigger({
                ...commonBookFields,
                id: book?.id || 0,
                description: editorFields.description,
            });
    }

    const deleteBook = () => {
        book && bookDeletionTrigger(book.id);
        onCancel();
    }

    const onFieldChange = (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>
        setEditorFields((prevState) => ({
            ...prevState,
            [ev.target.name]: ev.target.value,
        }));

    const onYearChange = (date: Date) => setEditorFields((prevState) => ({
        ...prevState,
        year: date?.getFullYear() || null,
    }))

    return (
        <form onSubmit={saveEditedBook} className="book book_editing">
            <div className="book-editor__field">
                <span>Название</span>
                <input
                    onChange={onFieldChange}
                    name="name"
                    defaultValue={book?.name}
                    placeholder="Title"
                    className="book-editor__input"
                />
            </div>
            <div className="book-editor__field">
                <span>Автор</span>
                <input
                    onChange={onFieldChange}
                    name="author"
                    defaultValue={book?.author}
                    placeholder="Author"
                    className="book-editor__input"
                />
            </div>
            <div className="book-editor__field">
                <span>Год написания</span>
                <DatePicker
                    onChange={onYearChange}
                    showYearPicker
                    selected={new Date(`${book?.year || new Date(Date.now())}`)}
                    dateFormat={'yyyy'}
                    className={'book-editor__input'}
                />
            </div>
            <div className="book-editor__field">
                <span>Жанры</span>
                <GenresField
                    onChange={(newOption) => setEditorFields((prevState) => {
                        return {...prevState, genres: newOption};
                    })}
                    selectedGenres={book?.genres.map((genre) => genre.id) || []}
                />
            </div>
            <div className="book-editor__field">
                <span>Описание</span>
                <textarea
                    onChange={onFieldChange}
                    name="description"
                    defaultValue={book?.description}
                    placeholder="(необязательно)"
                    className="book-editor__input book-editor__description"
                />
            </div>
            <div className="book-editor__actions">
                <button onClick={saveEditedBook} className="filters-block__button">
                    value={isCreation ? 'Создать' : 'Изменить'}
                </button>
                {
                    !isCreation &&
                    <button onClick={deleteBook} className="filters-block__button">Удалить</button>
                }
            </div>
            <button onClick={onCancel} className="book__edit-button">
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </form>
    );
}
