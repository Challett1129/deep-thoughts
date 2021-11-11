
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {

    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // There is no need to update the cache here because upon mutation, we recieve the updated thought, which contains the reactions array that we updated. 
    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = (e) => {
        const { value } = e.target;

        if (value.length <= 280) {
            setBody(value);
            setCharacterCount(value.length);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReaction({
                variables: { thoughtId, reactionBody }
            });
            setBody('');
            setCharacterCount(0);
        } catch (err) {
            console.error(err); 
        }
    }
    return (
        <div>
            <p className="m-0">
                Character Count: {characterCount}/280 {error && <span className="ml-2"> Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-mid algin-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                    value={reactionBody}
                    onChange={handleChange}
                    disabled={characterCount > 280 ? true : false}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;