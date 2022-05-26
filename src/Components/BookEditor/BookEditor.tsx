import 'react-datepicker/dist/react-datepicker.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BookModel, MultiSelectOption } from '../../Store/BooksLoader/types';
import { usePatchBookByIDMutation, usePostNewBookMutation } from '../../Store/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import './BookEditor.scss';


export interface BookEditorProps {
    book?: BookModel;
    isCreation: boolean;
    onCancel: () => void;
    onSave: () => void;
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


export function BookEditor({ book, isCreation = false, onSave, onCancel }: BookEditorProps) {
    const [ editorFields, setEditorFields ] = useState<EditorFields>(initialEditorFields);
    const [ fieldsMuted, setFieldsMuted ] = useState(false);

    const [ bookCreationTrigger ] = usePostNewBookMutation();
    const [ bookPatchingTrigger ] = usePatchBookByIDMutation();

    useEffect(() => {
        setEditorFields({
            name: book?.name || null,
            author: book?.author || null,
            year: book?.year || null,
            description: book?.description || '',
            genres: null,
        });
    }, []);

    const inputIsCorrect = () => !!(editorFields.name || editorFields.author || editorFields.genres || editorFields.year);

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

        onSave();
    }

    const onFieldChange = (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setFieldsMuted(true);
        setEditorFields((prevState) => ({
            ...prevState,
            [ev.target.name]: ev.target.value,
        }));
    };
    const onYearChange = (date: Date) => {
        setFieldsMuted(true);
        setEditorFields((prevState) => ({
            ...prevState,
            year: date?.getFullYear() || null,
        }));
    }
    const onGenresChange = (newOption: Array<MultiSelectOption>) => {
        setFieldsMuted(true);
        setEditorFields((prevState) => ({ ...prevState, genres: newOption }));
    };

    return (
        <form onSubmit={saveEditedBook} className="book-editor">
            <h3 className="book-editor__header">{(isCreation ? 'Добавление' : 'Изменение') + ' книги'}</h3>
            <div className="book-editor__fields">
                <div className="book-editor__field">
                    <span className="book-editor__field-name">Название</span>
                    <input
                        onChange={onFieldChange}
                        name="name"
                        defaultValue={book?.name}
                        placeholder="Title"
                        className="book-editor__input"
                    />
                </div>
                <div className="book-editor__field">
                    <span className="book-editor__field-name">Автор</span>
                    <input
                        onChange={onFieldChange}
                        name="author"
                        defaultValue={book?.author}
                        placeholder="Author"
                        className="book-editor__input"
                    />
                </div>
                <div className="book-editor__field">
                    <span className="book-editor__field-name">Год написания</span>
                    <DatePicker
                        onChange={onYearChange}
                        showYearPicker
                        selected={new Date(`${editorFields.year || book?.year || new Date(Date.now())}`)}
                        dateFormat={'yyyy'}
                        className={'book-editor__input'}
                    />
                </div>
                <div className="book-editor__field">
                    <span className="book-editor__field-name">Жанры</span>
                    <GenresField
                        onChange={onGenresChange}
                        selectedGenres={book?.genres.map((genre) => genre.id) || []}
                    />
                </div>
                <div className="book-editor__field">
                    <span className="book-editor__field-name">Описание</span>
                    <textarea
                        onChange={onFieldChange}
                        name="description"
                        defaultValue={book?.description || ''}
                        placeholder="(необязательно)"
                        className="book-editor__input book-editor__description"
                    />
                </div>
            </div>
            <button
                onClick={fieldsMuted ? saveEditedBook : undefined}
                className={`
                book-editor__edit-button
                ${fieldsMuted ? '' : 'button_blue_disabled'}
                button_blue`}>
                {isCreation ? 'Создать' : 'Применить'}
            </button>
            <button onClick={onCancel} className="book-editor__close-button">
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </form>
    );
}
