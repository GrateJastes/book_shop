import { FormEvent, useState } from 'react';
import { BookUpdateModel, MultiSelectOption } from '../../Features/BooksLoader/types';
import {
    useLazyDeleteBookByIDQuery,
    useLazyPatchBookByIDQuery,
    useLazyPostNewBookQuery
} from '../../Features/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { BookProps } from '../Book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export interface BookEditorProps {
    book?: BookProps;
    isCreation: boolean;
    onCancel: () => void;
    onUpdate: () => void;
}


export function BookEditor(props: BookEditorProps) {
    const [ selectedName, setSelectedName ] = useState<string | null>(null);
    const [ selectedAuthor, setSelectedAuthor ] = useState<string | null>(null);
    const [ selectedYear, setSelectedYear ] = useState<number | null>(null);
    const [ selectedDescription, setSelectedDescription ] = useState<string | null>(null);
    const [ selectedGenres, setSelectedGenres ] = useState<Array<MultiSelectOption> | null>(null);

    const [ bookCreationTrigger ] = useLazyPostNewBookQuery();
    const [ bookPatchingTrigger ] = useLazyPatchBookByIDQuery();
    const [ bookDeletionTrigger ] = useLazyDeleteBookByIDQuery();

    const inputIsCorrect = (): boolean => {
        if (!selectedName) {
            return false;
        }
        if (!selectedAuthor) {
            return false;
        }
        if (!selectedYear) {
            return false;
        }
        if (!selectedGenres) {
            return false;
        }

        return true;
    }

    const saveEditedBook = (ev: FormEvent<Element>) => {
        ev.preventDefault();

        if (!inputIsCorrect()) {
            return;
        }

        if (props.isCreation) {
            bookCreationTrigger({
                name: selectedName || '',
                id: 0,
                author: selectedAuthor || '',
                year: selectedYear || 0,
                genreIds: selectedGenres?.map((option) => option.value) || [],
                description: selectedDescription || '',
            });
        } else {
            let bookPatchingSettings: BookUpdateModel = {id: props.book?.id || 0};
            selectedName && (bookPatchingSettings.name = selectedName);
            selectedDescription && (bookPatchingSettings.description = selectedDescription);
            selectedYear && (bookPatchingSettings.year = selectedYear);
            selectedAuthor && (bookPatchingSettings.author = selectedAuthor);

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
                onChange={(ev) => setSelectedName(ev.target.value)}
                defaultValue={props?.book?.name}
                placeholder="Title"
                type="text"
                className="book__editor-input"
            />
            <span>Author</span>
            <input
                onChange={(ev) => setSelectedAuthor(ev.target.value)}
                defaultValue={props?.book?.author}
                placeholder="Author"
                type="text"
                className="book__editor-input"
            />
            <span>Year</span>
            <input
                onChange={(ev) => setSelectedYear(parseInt(ev.target.value))}
                defaultValue={props?.book?.year || ''}
                placeholder="Year"
                type="text"
                className="book__editor-input"
            />
            <span>Genres</span>
            <GenresField
                onChange={(newOption)=> setSelectedGenres(newOption)}
                selectedGenres={props.book?.genres.map((genre) => genre.id) || []}
            />
            <span>Description</span>
            <input
                onChange={(ev) => setSelectedDescription(ev.target.value)}
                defaultValue={props?.book?.description}
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
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </form>
    );
}

