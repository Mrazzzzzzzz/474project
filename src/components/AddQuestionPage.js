import React, { useState } from 'react';
import './AddQuestionPage.css';
import axios from 'axios';
import AddCategoryPage from './AddCategoryPage';

function AddQuestionPage ({closePopup, categories}) {
    
    const [formData, setFormData] = useState({
        question: '',
        owner_name: 'default',
        category_name: '',
        option1: '',
        option2: '',
        answer: '',
    });

    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            category_name: e.target.value,
        });
    };

    const onCreateHandler = async (e) => {
        e.preventDefault();
        try {
            if (categories.length === 1) {
                setFormData({
                  ...formData,
                  category_name: categories[0].category_name,
                });
            }
            const response = await axios.post('http://localhost:5000/question', formData);
            console.log(response.data);
            setFormData({
                question: '',
                owner_name: 'Tianyu',
                category_name: '',
                option1: '',
                option2: '',
                answer: '',
            });
    
            closePopup();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleAddCategory = (e) =>{
        e.preventDefault();
        setShowAddCategory(true);
    };

    const closeAddCategoryPage = () => {
        setShowAddCategory(false);
    };

    return(
        <>
            <form className="popup-outer" onSubmit={onCreateHandler}>
                <div className="popup-inner">
                    
                    <label htmlFor="fquestion">Question: </label>
                    <input type="text" 
                        id="fquestion" 
                        name="question" 
                        value={formData.question}
                        onChange={handleInputChange}
                        placeholder="Please type the question here (at most 256 characters)">
                    </input>

                    <label htmlFor="fcategories">Choose a category:</label>
                    <select name="category_name" 
                        id="fcategories" 
                        value={formData.category_name}
                        onChange={handleSelectChange}
                        onClick={handleSelectChange}>
                        {categories.map((category, index)=>(
                            <option key={index} value={category.category_name}>{category.category_name}</option>
                        ))}
                    </select>
                    <button type="button" className="create-category" onClick={handleAddCategory}>Add New Category</button>

                    <label htmlFor="foption1">Option 1: </label>
                    <input type="text" 
                        id="foption1" 
                        name="option1" 
                        value={formData.option1}
                        onChange={handleInputChange}
                        placeholder="Please provide a wrong answer">
                    </input>

                    <label htmlFor="foption2">Option 2: </label>
                    <input type="text" 
                        id="foption2" 
                        name="option2" 
                        value={formData.option2}
                        onChange={handleInputChange}
                        placeholder="Please provide another wrong answer">
                    </input>

                    <label htmlFor="fanswer">Answer: </label>
                    <input type="text" 
                        id="fanswer" 
                        name="answer" 
                        value={formData.answer}
                        onChange={handleInputChange}
                        placeholder="Please provide the correct answer">
                    </input>

                    <button type="button" onClick={closePopup} className="cancel"> Cancel</button>
                    <button type="submit" className="create"> Create</button>
                </div>
            </form>

            {showAddCategory && <AddCategoryPage closeAddCategoryPage={closeAddCategoryPage}/>}

        </>
    )
}

export default AddQuestionPage;