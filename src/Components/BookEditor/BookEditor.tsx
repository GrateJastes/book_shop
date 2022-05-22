import 'react-datepicker/dist/react-datepicker.css';
import { FormEvent, useState } from 'react';
import { MultiSelectOption } from '../../Store/BooksLoader/types';
import {
    useDeleteBookByIDMutation,
    usePatchBookByIDMutation,
    usePostNewBookMutation
} from '../../Store/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { BookProps } from '../Book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';


export interface BookEditorProps {
    book?: BookProps;
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


export function BookEditor(props: BookEditorProps) {
    const [editorFields, setEditorFields] = useState<EditorFields>({
        name: null,
        author: null,
        year: null,
        description: null,
        genres: null,
    });

    const [bookCreationTrigger] = usePostNewBookMutation();
    const [bookPatchingTrigger] = usePatchBookByIDMutation();
    const [bookDeletionTrigger] = useDeleteBookByIDMutation();

    const inputIsCorrect = () => !!(editorFields.name && editorFields.author && editorFields.genres && editorFields.year);

    const saveEditedBook = (ev: FormEvent) => {
        ev.preventDefault();

        if (!inputIsCorrect()) {
            return;
        }

        props.isCreation ?
            bookCreationTrigger({
                id: 0,
                name: editorFields.name,
                author: editorFields.author,
                year: editorFields.year,
                description: editorFields.description || '',
                genreIds: editorFields.genres?.map((option) => option.value) || null,
            })
            : bookPatchingTrigger({
                id: props.book?.id || 0,
                name: editorFields.name,
                author: editorFields.author,
                year: editorFields.year,
                description: editorFields.description,
                genreIds: editorFields.genres?.map((option) => option.value) || null,
            });
    }

    const deleteBook = () => {
        props.book && bookDeletionTrigger(props.book.id);
        props.onCancel();
    }

    return (
        <form onSubmit={saveEditedBook} className="book book_editing">
            <span>Title</span>
            <input
                onChange={(ev) => setEditorFields((prevState) => {
                    return {...prevState, name: ev.target.value};
                })}
                defaultValue={props.book?.name}
                placeholder="Title"
                type="text"
                className="book__editor-input"
            />
            <span>Author</span>
            <input
                onChange={(ev) => setEditorFields((prevState) => {
                    return {...prevState, author: ev.target.value};
                })}
                defaultValue={props.book?.author}
                placeholder="Author"
                type="text"
                className="book__editor-input"
            />
            <span>Year</span>
            <DatePicker
                onChange={(date: Date) => setEditorFields((prevState) => {
                    return {...prevState, year: date?.getFullYear() || null};
                })}
                showYearPicker
                selected={new Date(`${props.book?.year || new Date(Date.now())}`)}
                dateFormat={'yyyy'}
                className={'book__editor-input'}
            />
            <span>Genres</span>
            <GenresField
                onChange={(newOption) => setEditorFields((prevState) => {
                    return {...prevState, genres: newOption};
                })}
                selectedGenres={props.book?.genres.map((genre) => genre.id) || []}
            />
            <span>Description</span>
            <input
                onChange={(ev) => setEditorFields((prevState) => {
                    return {...prevState, description: ev.target.value};
                })}
                defaultValue={props.book?.description}
                placeholder="Description will be here"
                type="text"
                className="book__editor-input"
            />
            <div className="book__editor-actions">
                <input type="submit" className="filters-block__button book__editor-button"/>
                {
                    !props.isCreation &&
                    <button onClick={deleteBook} className="filters-block__button book__editor-button">Delete</button>
                }
            </div>
            <button onClick={props.onCancel} className="book__edit-button">
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </form>
    );
}
