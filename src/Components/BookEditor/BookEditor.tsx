import 'react-datepicker/dist/react-datepicker.css';
import { FormEvent, useState } from 'react';
import { BookUpdateModel, MultiSelectOption } from '../../Store/BooksLoader/types';
import {
    useLazyDeleteBookByIDQuery,
    useLazyPatchBookByIDQuery,
    useLazyPostNewBookQuery
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
    onUpdate: () => void;
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

    const [bookCreationTrigger] = useLazyPostNewBookQuery();
    const [bookPatchingTrigger] = useLazyPatchBookByIDQuery();
    const [bookDeletionTrigger] = useLazyDeleteBookByIDQuery();

    const inputIsCorrect = () => !!(editorFields.name && editorFields.author && editorFields.genres && editorFields.year);

    const saveEditedBook = (ev: FormEvent) => {
        ev.preventDefault();

        if (!inputIsCorrect()) {
            return;
        }

        if (props.isCreation) {
            bookCreationTrigger({
                name: editorFields.name || '',
                id: 0,
                author: editorFields.author || '',
                year: editorFields.year || 0,
                genreIds: editorFields.genres?.map((option) => option.value) || [],
                description: editorFields.description || '',
            });
        } else {
            let bookPatchingSettings: BookUpdateModel = {id: props.book?.id || 0};

            editorFields.name && (bookPatchingSettings.name = editorFields.name);
            editorFields.author && (bookPatchingSettings.author = editorFields.author);
            editorFields.year && (bookPatchingSettings.year = editorFields.year);
            editorFields.description && (bookPatchingSettings.description = editorFields.description);

            bookPatchingTrigger(bookPatchingSettings);
        }

        props.onUpdate();
    }

    const deleteBook = () => {
        props.book && bookDeletionTrigger(props.book.id);
        props.onUpdate(); //TODO: how to check and update automatic?
    }

    return (
        <form onSubmit={saveEditedBook} className="book book_editing">
            <span>Title</span>
            <input
                onChange={(ev) => setEditorFields({...editorFields, name: ev.target.value})}
                defaultValue={props.book?.name}
                placeholder="Title"
                type="text"
                className="book__editor-input"
            />
            <span>Author</span>
            <input
                onChange={(ev) => setEditorFields({...editorFields, author: ev.target.value})}
                defaultValue={props.book?.author}
                placeholder="Author"
                type="text"
                className="book__editor-input"
            />
            <span>Year</span>
            <DatePicker
                onChange={(date: Date) => setEditorFields({...editorFields, year: date?.getFullYear() || null})}
                showYearPicker
                selected={new Date(`${props.book?.year || new Date(Date.now())}`)}
                dateFormat={'yyyy'}
                className={'book__editor-input'}
            />
            <span>Genres</span>
            <GenresField
                onChange={(newOption) => setEditorFields({...editorFields, genres: newOption})}
                selectedGenres={props.book?.genres.map((genre) => genre.id) || []}
            />
            <span>Description</span>
            <input
                onChange={(ev) => setEditorFields({...editorFields, author: ev.target.value})}
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
