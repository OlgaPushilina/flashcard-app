function CardForm({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  submitButtonText = "Save",
  cancelButtonText = "Cancel",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          placeholder="Front side of card"
          value={formData.front}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          placeholder="Back side of card"
          value={formData.back}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleCancel}
      >
        {cancelButtonText}
      </button>
      <button type="submit" className="btn btn-primary">
        {submitButtonText}
      </button>
    </form>
  );
}

export default CardForm;
