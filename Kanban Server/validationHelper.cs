using System.ComponentModel.DataAnnotations;

namespace Kanban_Server{
    public static class ValidationHelper
    {
        public static List<string> Validate<T>(T obj)
        {

            if (obj == null)
                return ["Object cannot be null"];

            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(obj, serviceProvider: null, items: null);
            var isValid = Validator.TryValidateObject(obj, context, validationResults, validateAllProperties: true);

            if (isValid)
                return [];

            return validationResults.Select(r => r.ErrorMessage ?? "Validation error").ToList();
        }
    }
}